import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:untitled/Components/appBar.dart';
import 'package:untitled/classes/carpoolOffer.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:animate_do/animate_do.dart';
import 'package:untitled/Components/bottomBar.dart';
import 'package:untitled/main.dart';

import '../Services/TripOffers.service.dart';

class Offers extends StatefulWidget {
  const Offers({super.key});

  @override
  State<Offers> createState() => _OffersState();
}

class _OffersState extends State<Offers> {
  List<CarpoolOffer> _offers = [];
  int _currentPage = 1;
  bool _isLoading = false;
  bool _hasMore = true;
  final ScrollController _scrollController = ScrollController();
  final TextEditingController _searchController = TextEditingController();
  String _selectedDate = '';
  String _selectedStartPoint = '';
  String _selectedDestination = '';
  double _selectedPrice = 0.0;
  TextEditingController total_price=TextEditingController();
  TextEditingController reservationSeatsController = TextEditingController();
  TextEditingController dateController=TextEditingController();
  final tripOfferService=getIt<TripOffers>();

  @override
  void initState() {
    super.initState();
    _fetchOffers();
    _scrollController.addListener(() {
      if (_scrollController.position.pixels >=
          _scrollController.position.maxScrollExtent - 200 &&
          !_isLoading &&
          _hasMore) {
        _fetchOffers();
      }
    });
  }
  Future<void> _fetchOffers() async {
    try {
      List<CarpoolOffer> offers = await tripOfferService.fetchCarpoolOffers();
      setState(() {
        _offers = offers;
      });
    } catch (e) {
      print('Error fetching offers: $e');
    }
  }



  void _showFilterDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Filter Offers'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                decoration: InputDecoration(labelText: 'Start Point'),
                onChanged: (value) {
                  _selectedStartPoint = value;
                },
              ),
              TextField(
                decoration: InputDecoration(labelText: 'Destination'),
                onChanged: (value) {
                  _selectedDestination = value;
                },
              ),
              TextField(
                decoration: InputDecoration(
                  labelText: 'Date',
                  suffixIcon: IconButton(
                    icon: Icon(Icons.calendar_today),
                    onPressed: () async {
                      DateTime? pickedDate = await showDatePicker(
                        context: context,
                        initialDate: DateTime.now(),
                        firstDate: DateTime.now(),
                        lastDate: DateTime.now().add(Duration(days: 365)),
                      );
                      if (pickedDate != null) {
                        setState(() {
                          _selectedDate = DateFormat('yyyy-MM-dd').format(pickedDate);
                        });
                      }
                    },
                  ),
                ),
                readOnly: true,
                controller: TextEditingController(text: _selectedDate),
              ),
              TextField(
                decoration: InputDecoration(labelText: 'Max Price'),
                keyboardType: TextInputType.number,
                onChanged: (value) {
                  _selectedPrice = double.tryParse(value) ?? 0.0;
                },
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                // Apply the filter logic here
                Navigator.of(context).pop();
              },
              child: Text('Apply Filters'),
            ),
          ],
        );
      },
    );
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  Widget _buildOfferCard(CarpoolOffer offer) {
    return FadeInUp(
      child: Card(
        elevation: 4,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        margin: EdgeInsets.symmetric(vertical: 8, horizontal: 8),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(Icons.location_on, color: Colors.deepPurple, size: 30),
                  SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      '${offer.start_point} -> ${offer.destination}',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 10),
              Divider(),
              SizedBox(height: 10),
              Text(
                'Date: ${offer.trip_date.toLocal()}',
                style: TextStyle(fontSize: 14, color: Colors.grey[600]),
              ),
              Text(
                'Time: ${offer.startTime?.format(context) ?? 'N/A'}',
                style: TextStyle(fontSize: 14, color: Colors.grey[600]),
              ),
              Text(
                'Price: ${offer.price}DT',
                style: TextStyle(fontSize: 14, color: Colors.grey[600]),
              ),
              Text(
                'Available Places: ${offer.places}',
                style: TextStyle(fontSize: 14, color: Colors.grey[600]),
              ),
              Text(
                'Smoking Allowed: ${offer.isSmokingAllowed ? 'Yes' : 'No'}',
                style: TextStyle(fontSize: 14, color: Colors.grey[600]),
              ),
              SizedBox(height: 10),
              Align(
                alignment: Alignment.centerRight,
                child: ElevatedButton(
                  onPressed: () {
                    tripOfferService.subscribeInfos(context,offer.id,total_price,reservationSeatsController,dateController);

                  },
                  child: Text('Take a place'),
                  style: ElevatedButton.styleFrom(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: CustomBottomBar(),
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: TextField(
                controller: _searchController,
                decoration: InputDecoration(
                  prefixIcon: Icon(Icons.search),
                  hintText: 'Find your taste',
                  suffixIcon: IconButton(
                    icon: Icon(Icons.filter_list),
                    onPressed: _showFilterDialog,
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
            ),
            Expanded(
              child: _offers.isEmpty && !_isLoading
                  ? Center(
                child: Text(
                  'No available offers.',
                  style: TextStyle(fontSize: 18, color: Colors.grey),
                ),
              )
                  : ListView.builder(
                controller: _scrollController,
                padding: EdgeInsets.all(15),
                itemCount: _offers.length + (_hasMore ? 1 : 0),
                itemBuilder: (context, index) {
                  if (index < _offers.length) {
                    return _buildOfferCard(_offers[index]);
                  } else {
                    return Padding(
                      padding: const EdgeInsets.symmetric(vertical: 20),
                      child: Center(
                        child: SpinKitWave(
                          color: Colors.deepPurple,
                          size: 50.0,
                        ),
                      ),
                    );
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
