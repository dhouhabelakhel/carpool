import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:untitled/Components/appBar.dart';
import 'package:untitled/classes/carpoolOffer.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:animate_do/animate_do.dart';

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

  @override
  void initState() {
    super.initState();
    _fetchCarpoolOffers();
    _scrollController.addListener(() {
      if (_scrollController.position.pixels >=
          _scrollController.position.maxScrollExtent - 200 &&
          !_isLoading &&
          _hasMore) {
        _fetchCarpoolOffers();
      }
    });
  }

  Future<void> _fetchCarpoolOffers() async {
    setState(() {
      _isLoading = true;
    });
    try {
      final response = await http.get(
        Uri.parse('http://192.168.1.4:3000/api/tripOffers?page=$_currentPage'),
      );

      if (response.statusCode == 200) {
        Map<String, dynamic> jsonResponse = json.decode(response.body);
        List<dynamic> data = jsonResponse['data'];
        int totalPages = jsonResponse['totalPages'] ?? 1;

        setState(() {
          _currentPage++;
          _offers.addAll(data.map((offer) => CarpoolOffer.fromJson(offer)).toList());
          if (_currentPage > totalPages) {
            _hasMore = false;
          }
        });
      } else {
        throw Exception('Error');
      }
    } catch (e) {
      print('Error: $e');
    } finally {
      setState(() {
        _isLoading = false;
      });
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
                'Price: \$${offer.price}',
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
                  onPressed: () {},
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
      appBar: CustomAppBar(),
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
