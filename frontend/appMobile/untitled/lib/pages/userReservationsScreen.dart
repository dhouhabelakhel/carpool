import 'package:flutter/material.dart';
import 'package:untitled/classes/reservation.dart';
import '../Components/bottomBar.dart';
import '../Services/TripOffers.service.dart';
import '../Services/setupLocator.dart';

class UserReservationsScreen extends StatelessWidget {
  final int userId;
  final tripOfferService = getIt<TripOffers>();

  UserReservationsScreen({required this.userId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: CustomBottomBar(),

      appBar: AppBar(
        title: Text('My Reservations'),
        backgroundColor: Colors.deepPurple,
      ),
      body: FutureBuilder<List<Reservation>>(
        future: tripOfferService.userReservations(userId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData && snapshot.data!.isEmpty) {
            return Center(
              child: Text(
                'No reservations found',
                style: TextStyle(fontSize: 16, color: Colors.grey),
              ),
            );
          } else if (snapshot.hasData) {
            final reservations = snapshot.data!;
            return Padding(
              padding: const EdgeInsets.all(8.0),
              child: ListView.builder(
                itemCount: reservations.length,
                itemBuilder: (context, index) {
                  final reservation = reservations[index];
                  return Card(
                    elevation: 4,
                    margin: EdgeInsets.symmetric(vertical: 8, horizontal: 10),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Reservation #${reservation.id}',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.deepPurple,
                                ),
                              ),
                              Container(
                                padding: EdgeInsets.symmetric(
                                  horizontal: 10,
                                  vertical: 5,
                                ),
                                decoration: BoxDecoration(
                                  color: reservation.status
                                      ? Colors.green.shade100
                                      : Colors.orange.shade100,
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Text(
                                  reservation.status ? 'Confirmed' : 'Pending',
                                  style: TextStyle(
                                    color: reservation.status
                                        ? Colors.green
                                        : Colors.orange,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 10),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Date:',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              Text(
                                reservation.reservationDate,
                                style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.grey.shade600,
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 5),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Seats:',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              Text(
                                '${reservation.reservationSeats}',
                                style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.grey.shade600,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            );
          } else {
            return Center(child: Text('Unexpected error'));
          }
        },
      ),
    );
  }
}
