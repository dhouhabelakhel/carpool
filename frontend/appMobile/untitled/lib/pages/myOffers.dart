import 'package:flutter/material.dart';
import 'package:untitled/Services/TripOffers.service.dart';
import 'package:untitled/Services/user.service.dart';

class TripOffersPage extends StatefulWidget {
  final int userId; // Pass the userId as a parameter

  const TripOffersPage({Key? key, required this.userId}) : super(key: key);

  @override
  _TripOffersPageState createState() => _TripOffersPageState();
}

class _TripOffersPageState extends State<TripOffersPage> {
  final  _tripOfferService = user();
  List<dynamic>? _tripOffers;

  @override
  void initState() {
    super.initState();
    _fetchTripOffers();
  }

  Future<void> _fetchTripOffers() async {
    final offers = await _tripOfferService.getTripOffersByUserId(widget.userId);
    setState(() {
      _tripOffers = offers?['data'];
      print(_tripOffers); // Debugging
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Trip Offers'),
        backgroundColor: Colors.deepPurple,
      ),
      body: _tripOffers == null
          ? const Center(child: CircularProgressIndicator())
          : _tripOffers!.isEmpty
          ? const Center(child: Text('No trip offers available.'))
          : SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: DataTable(
            columns: const [
              DataColumn(label: Text('Offer ID')),
              DataColumn(label: Text('Start Point')),
              DataColumn(label: Text('Destination')),
              DataColumn(label: Text('Trip Date')),
              DataColumn(label: Text('Price')),
            ],
            rows: _buildRows(_tripOffers!),
          ),
        ),
      ),
    );
  }

  List<DataRow> _buildRows(List<dynamic> offers) {
    return offers.map<DataRow>((offer) {
      return DataRow(
        cells: [
          DataCell(Text(offer['id'].toString())),
          DataCell(Text(offer['start_point'] ?? 'No start point')),
          DataCell(Text(offer['destination'] ?? 'No destination')),
          DataCell(Text(offer['trip_date'] ?? 'No date')),
          DataCell(Text('${offer['price']}DT')),

        ],
      );
    }).toList();
  }

  Future<void> _updateOfferStatus(int offerId, String status) async {
    // Add logic to update the status of the offer
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Offer $offerId marked as $status')),
    );
  }
}
