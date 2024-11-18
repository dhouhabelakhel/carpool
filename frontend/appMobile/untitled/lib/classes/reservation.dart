class Reservation {
  final int id;
  final String reservationDate;
  final int reservationSeats;
  final bool status;
  final int totalPrice;
  final int tripOfferId;
  final int user_id;

  Reservation({
    required this.id,
    required this.reservationDate,
    required this.reservationSeats,
    required this.status,
    required this.totalPrice,
    required this.tripOfferId,
    required this.user_id
  });

  factory Reservation.fromJson(Map<String, dynamic> json) {
    return Reservation(
      id: json['id'] ?? 0, // Default to 0 if null
      reservationDate: json['reservation_date'] ?? '', // Default to empty string if null
      reservationSeats: json['reservation_seats'] ?? 0, // Default to 0 if null
      status: json['status'] ?? false, // Default to false if null
      totalPrice: json['total_price'] ?? 0, // Default to 0 if null
      tripOfferId: json['trip_offer'] ?? 0, // Default to 0 if null
      user_id: json['user_id'] ?? 0, // Default to 0 if null

    );
  }
}
