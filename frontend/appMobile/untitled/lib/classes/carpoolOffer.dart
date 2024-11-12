import 'package:flutter/material.dart';

class CarpoolOffer {
  final int id;
  final DateTime trip_date;
  final TimeOfDay? startTime;
  final String start_point;
  final int price;
  final int places;
  final bool isSmokingAllowed;
  final String destination;
  final int user_id;

  CarpoolOffer({
    required this.id,
    required this.destination,
    required this.isSmokingAllowed,
    required this.places,
    required this.price,
    required this.start_point,
    required this.startTime,
    required this.trip_date,
    required this.user_id,
  });

  factory CarpoolOffer.fromJson(Map<String, dynamic> json) {
    return CarpoolOffer(
      id: json['id'],
      destination: json['destination'],
      isSmokingAllowed: json['isSmokingAllowed'],
      places: json['places'],
      price: json['price'],
      start_point: json['start_point'],
      startTime: json['startTime'] != null
          ? TimeOfDay(
        hour: int.parse(json['startTime'].split(":")[0]),
        minute: int.parse(json['startTime'].split(":")[1]),
      )
          : null,
      trip_date: DateTime.parse(json['trip_date']),
      user_id: json['user_id'],
    );
  }
}
