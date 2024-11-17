import 'dart:convert';
import 'package:http/http.dart' as http;
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
            'Failed to load carpool offers. Status code: ${response.statusCode}');
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
  Future<void> _subscribe(num tripId,DateTime reservation_date,num reservation_seats) async {
    try {
      // URL de l'API pour s'abonner à une offre
      final url = Uri.parse('http://192.168.1.4:3000/api/TripReservation');

      final body = jsonEncode({
        'tripId': tripId,
        'reservation_date': reservation_date,
        'reservation_seats': reservation_seats,
      });

      // Envoyer une requête POST au serveur
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: body,
      );

      // Vérifier la réponse
      if (response.statusCode == 200 || response.statusCode == 201) {
        print('Successfully subscribed to trip offer');
      } else {
        throw Exception(
            'Failed to subscribe to trip offer. Status code: ${response.statusCode}');
      }
    } catch (e) {
      print('Error subscribe to carpool offer: $e');
      rethrow; // Relancer l'erreur pour une gestion externe
    }
  }

}
