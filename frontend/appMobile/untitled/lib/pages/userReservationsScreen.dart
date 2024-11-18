import 'package:flutter/material.dart';
import 'package:untitled/classes/reservation.dart';

import '../Services/TripOffers.service.dart';
import '../Services/setupLocator.dart';

class UserReservationsScreen extends StatelessWidget {
  final int userId;
  final tripOfferService = getIt<TripOffers>();

  UserReservationsScreen({required this.userId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('My Reservations')),
      body: FutureBuilder<List<Reservation>>(
        future: tripOfferService.userReservations(userId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData && snapshot.data!.isEmpty) {
            return Center(child: Text('No reservations found'));
          } else if (snapshot.hasData) {
            final reservations = snapshot.data!;
            return ListView.builder(
              itemCount: reservations.length,
              itemBuilder: (context, index) {
                final reservation = reservations[index];
                return ListTile(
                  title: Text('Reservation #${reservation.id}'),
                  subtitle: Text(
                    'Date: ${reservation.reservationDate}\nSeats: ${reservation.reservationSeats}',
                  ),
                  trailing: Text(
                    reservation.status ? 'Confirmed' : 'Pending',
                    style: TextStyle(
                      color: reservation.status ? Colors.green : Colors.orange,
                    ),
                  ),
                );
              },
            );
          } else {
            return Center(child: Text('Unexpected error'));
          }
        },
      ),
    );
  }
}
