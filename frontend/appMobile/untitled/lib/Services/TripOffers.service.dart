import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'package:untitled/Services/user.service.dart';
import 'package:untitled/classes/reservation.dart';
import '../classes/tripOffer.dart';
import '../classes/carpoolOffer.dart';

class TripOffers {
  /// Récupérer toutes les offres de covoiturage
  Future<List<CarpoolOffer>> fetchCarpoolOffers() async {
    try {
      final response = await http.get(
        Uri.parse('http://192.168.1.4:3000/api/tripOffers?page=1'),
      );

      if (response.statusCode == 200) {
        Map<String, dynamic> jsonResponse = json.decode(response.body);
        List<dynamic> data = jsonResponse['data'];

        // Convertir les données en liste d'objets `CarpoolOffer`
        return data.map((offer) => CarpoolOffer.fromJson(offer)).toList();
      } else {
        throw Exception(
            'Failed to load carpool offers. Status code: ${response
                .statusCode}');
      }
    } catch (e) {
      print('Error fetching carpool offers: $e');
      rethrow; // Relancer l'erreur pour la gestion externe
    }
  }

  /// Ajouter une nouvelle offre de covoiturage
  Future<CarpoolOffer> addCarpoolOffer(TripOffer newOffer) async {
    try {
      final response = await http.post(
        Uri.parse('http://192.168.1.4:3000/api/tripOffers'),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(newOffer.toJson()),
      );

      if (response.statusCode == 201) {
        // Convertir la réponse en objet `CarpoolOffer`
        Map<String, dynamic> jsonResponse = json.decode(response.body);
        return CarpoolOffer.fromJson(jsonResponse);
      } else {
        throw Exception(
            'Failed to create trip offer. Status code: ${response.statusCode}');
      }
    } catch (e) {
      print('Error adding carpool offer: $e');
      rethrow; // Relancer l'erreur pour la gestion externe
    }
  }



  Future<TripOffer> findById(num id) async {
    final url = Uri.parse('http://192.168.1.4:3000/api/tripOffers/$id');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonResponse = json.decode(response.body);
      if (jsonResponse['data'] != null) {
        final data = jsonResponse['data'];
        print('Response body: ${response.body}');
        print('Data: $data');
        return TripOffer.fromJson(data);
      } else {
        throw Exception('No data found in the response');
      }
    } else {
      throw Exception('Failed to load TripOffer. Status code: ${response.statusCode}');
    }
  }
  /// Souscrire à une offre de covoiturage
  Future<void> subscribeToTripOffer({
    required num tripId,
    required DateTime reservationDate,
    required int reservationSeats,
    required var user_id,
  }) async {
    try {
      // URL de l'API pour s'abonner à une offre
      final url = Uri.parse('http://192.168.1.4:3000/api/TripReservation');

      // Construction du corps de la requête
      final body = jsonEncode({
        'trip_offer': tripId,
        'user_id':user_id,
        'reservation_date': reservationDate.toIso8601String(),
        'reservation_seats': reservationSeats,
        'status':false
      });

      // Envoi de la requête POST
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: body,
      );

      // Vérification du code de statut HTTP
      if (response.statusCode == 200 || response.statusCode == 201) {
        Fluttertoast.showToast(
          msg: "Subscription to trip offer succeeded",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.deepPurple,
          textColor: Colors.white,
          fontSize: 16.0,
        );
      } else {
        throw Exception(
          'Failed to subscribe to trip offer. Status code: ${response.statusCode}',
        );
      }
    } catch (e) {
      print('Error subscribing to trip offer: $e');
      rethrow;
    }
  }

 //subscribe infos
  void subscribeInfos(BuildContext context,num id,TextEditingController total_price,TextEditingController reservationSeatsController,TextEditingController dateController) async {
    TripOffer? tripOffer;
    final userService=user();
    final decodedToken=await userService.getCurrentUser();
    if (decodedToken == null ) {
      Fluttertoast.showToast(
        msg: "Failed to retrieve user ID",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16.0,
      );
      return;
    }
     var userId = decodedToken['userId'];
    try {
      tripOffer = await findById(id);
      print(tripOffer);
    } catch (e) {
      print('Error fetching trip offer: $e');
      return;
    }

    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return AlertDialog(
              title: Text('Subscribe'),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextField(
                    decoration: InputDecoration(
                      labelText: 'Reservation Date and Time',
                      suffixIcon: IconButton(
                        icon: Icon(Icons.calendar_today),
                        onPressed: () async {
                          // Affiche le sélecteur de date
                          DateTime? pickedDate = await showDatePicker(
                            context: context,
                            initialDate: DateTime.now(),
                            firstDate: DateTime.now(),
                            lastDate: DateTime.now().add(Duration(days: 365)),
                          );
                          if (pickedDate != null) {
                            // Si une date est choisie, affichage de l'heure
                            TimeOfDay? pickedTime = await showTimePicker(
                              context: context,
                              initialTime: TimeOfDay.fromDateTime(DateTime.now()),
                            );
                            if (pickedTime != null) {
                              // Combiner la date et l'heure pour obtenir le format complet
                              DateTime finalDate = DateTime(
                                pickedDate.year,
                                pickedDate.month,
                                pickedDate.day,
                                pickedTime.hour,
                                pickedTime.minute,
                              );

                              setState(() {
                                // Mettre à jour le contrôleur avec la date et l'heure combinées
                                dateController.text = finalDate.toString(); // Format: yyyy-MM-dd HH:mm:ss.000
                              });

                            }
                          }
                        },
                      ),
                    ),
                    controller: dateController,
                  ),
                  SizedBox(height: 20),
                  TextField(
                    controller: reservationSeatsController,
                    decoration: InputDecoration(
                      labelText: 'Reservation Seats',
                      icon: Icon(Icons.person),
                    ),
                    keyboardType: TextInputType.number,
                    onChanged: (value) {
                      if (value.isNotEmpty) {
                        int seats = int.parse(value);
                        setState(() {
                          int price = tripOffer?.price.toInt() ?? 0;
                          total_price.text = (price * seats).toStringAsFixed(2);
                        });
                      } else {
                        setState(() {
                          total_price.text = '';
                        });
                      }
                    },
                  ),
                  SizedBox(height: 20),
                  TextField(
                    controller: total_price,
                    decoration: InputDecoration(
                      labelText: 'Total Price',
                      icon: Icon(Icons.attach_money),
                    ),
                    readOnly: true,
                  ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () async {
                    try {
                      // Vérifiez que les champs ne sont pas vides
                      if (dateController.text.isEmpty || reservationSeatsController.text.isEmpty) {
                        Fluttertoast.showToast(
                          msg: "Please fill in all the fields",
                          toastLength: Toast.LENGTH_SHORT,
                          gravity: ToastGravity.BOTTOM,
                          backgroundColor: Colors.red,
                          textColor: Colors.white,
                          fontSize: 16.0,
                        );
                        return;
                      }

                      // Validez le format de la date et de l'heure
                      DateTime reservationDate;
                      try {
                        reservationDate = DateTime.parse(dateController.text);
                      } catch (e) {
                        Fluttertoast.showToast(
                          msg: "Invalid date format",
                          toastLength: Toast.LENGTH_SHORT,
                          gravity: ToastGravity.BOTTOM,
                          backgroundColor: Colors.red,
                          textColor: Colors.white,
                          fontSize: 16.0,
                        );
                        return;
                      }

                      int reservationSeats;
                      try {
                        reservationSeats = int.parse(reservationSeatsController.text);
                      } catch (e) {
                        Fluttertoast.showToast(
                          msg: "Invalid number of seats",
                          toastLength: Toast.LENGTH_SHORT,
                          gravity: ToastGravity.BOTTOM,
                          backgroundColor: Colors.red,
                          textColor: Colors.white,
                          fontSize: 16.0,
                        );
                        return;
                      }

                      await subscribeToTripOffer(
                        tripId: id,
                        user_id:userId,
                        reservationDate: reservationDate,
                        reservationSeats: reservationSeats,
                      );

                      // Confirmation en cas de succès
                      print('Successfully subscribed to the trip offer');
                      setState(() {
                        dateController.clear();
                        reservationSeatsController.clear();
                        total_price.clear();
                      });
                      Navigator.pop(context);

                    } catch (e) {
                      print('Error occurred: $e');
                    }
                  },
                  child: Text('Take a place'),
                ),
              ],
            );
          },
        );
      },
    );
  }
  Future<List<Reservation>> userReservations(int userId) async {
    final url = Uri.parse(
        'http://192.168.1.4:3000/api/TripReservation?user=$userId');

    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        final Map<String, dynamic> responseBody = json.decode(response.body);

        // Check for the 'message' field
        if (responseBody['message'] == 'reservation founded') {
          final List<dynamic> reservationsData = responseBody['data'];

          // Ensure that 'data' is a list before mapping it
          if (reservationsData is List) {
            return reservationsData
                .map((data) =>
                Reservation.fromJson(data as Map<String, dynamic>))
                .toList();
          } else {
            throw Exception(
                'Expected list of reservations, but got something else.');
          }
        } else {
          return []; // Return an empty list if no reservations are found
        }
      } else {
        throw Exception('Failed to load reservations: ${response.statusCode}');
      }
    } catch (error) {
      print('Error fetching reservations: $error');
      rethrow;
    }
  }}