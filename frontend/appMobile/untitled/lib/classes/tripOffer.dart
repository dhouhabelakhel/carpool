class TripOffer {
  final String tripDate;
  final String? startTime;
  final double price;
  final int places;
  final bool isSmokingAllowed;
  final int userId;
  final String destination;
  final String startPoint;

  TripOffer({
    required this.tripDate,
    this.startTime,
    required this.price,
    required this.places,
    required this.isSmokingAllowed,
    required this.userId,
    required this.destination,
    required this.startPoint,
  });

  factory TripOffer.fromJson(Map<String, dynamic> json) {
    return TripOffer(
      tripDate: json['trip_date'], // Correspond exactement au backend
      startTime: json['start_time'], // Gère les valeurs nullables
      price: (json['price'] as num).toDouble(), // Convertit en double si nécessaire
      places: json['places'],
      isSmokingAllowed: json['isSmokingAllowed'] ?? false, // Défaut à false si absent
      userId: json['user_id'],
      destination: json['destination'],
      startPoint: json['start_point'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'trip_date': tripDate,
      'start_time': startTime,
      'price': price,
      'places': places,
      'isSmokingAllowed': isSmokingAllowed,
      'user_id': userId,
      'destination': destination,
      'start_point': startPoint,
    };
  }
}
