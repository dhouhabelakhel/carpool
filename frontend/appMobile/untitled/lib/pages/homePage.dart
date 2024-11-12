import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:untitled/classes/carpoolOffer.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart'; // For loading animation
import 'package:animate_do/animate_do.dart'; // For animations

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<CarpoolOffer> _offers = [];

  @override
  void initState() {
    super.initState();
    _fetchCarpoolOffers();
  }

  Future<void> _fetchCarpoolOffers() async {
    try {
      final response =
          await http.get(Uri.parse('http://192.168.1.4:3000/api/tripOffers?page=1'));

      if (response.statusCode == 200) {
        Map<String, dynamic> jsonResponse = json.decode(response.body);
        List<dynamic> data = jsonResponse['data'];
        setState(() {
          _offers = data.map((offer) => CarpoolOffer.fromJson(offer)).toList();
        });
      } else {
        throw Exception('Failed to load carpool offers');
      }
    } catch (e) {
      print('Error: $e');
      // Handle error here, e.g., show a Snackbar or Dialog
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'CarPool',
          style: TextStyle(
              color: Colors.deepPurple,
              fontWeight: FontWeight.bold,
              fontSize: 25),
        ),
        backgroundColor: Colors.grey,
        centerTitle: true,
      ),
      body: SafeArea(
        child: _offers.isEmpty
            ? Center(
                child: SpinKitWave(color: Colors.pinkAccent, size: 50.0),
              )
            : SingleChildScrollView(
                padding: EdgeInsets.all(15),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Welcome Banner
                    Container(
                      width: double.infinity,
                      padding: EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.deepPurple,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        'Welcome to CarPool!',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    SizedBox(height: 20),

                    // Quick Actions
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        FadeIn(
                          duration: Duration(milliseconds: 500),
                          child: ElevatedButton.icon(
                            onPressed: () {},
                            icon: Icon(Icons.add),
                            label: Text('Post Offer'),
                            style: ElevatedButton.styleFrom(
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                              padding: EdgeInsets.symmetric(
                                  horizontal: 20, vertical: 10),
                            ),
                          ),
                        ),
                        FadeIn(
                          duration: Duration(milliseconds: 700),
                          child: ElevatedButton.icon(
                            onPressed: () {},
                            icon: Icon(Icons.search),
                            label: Text('Find Offer'),
                            style: ElevatedButton.styleFrom(
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                              padding: EdgeInsets.symmetric(
                                  horizontal: 20, vertical: 10),
                            ),
                          ),
                        ),
                      ],
                    ),

                    SizedBox(height: 20),

                    // Latest Carpool Offers
                    FadeInLeft(
                      child: Text(
                        'Latest Carpool Offers',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    SizedBox(height: 20,),
                    SizedBox(
                      height: 280,
                      child: ListView.builder(
                        scrollDirection:
                            Axis.horizontal, // Horizontal scrolling
                        itemCount: _offers.length,
                        itemBuilder: (context, index) {
                          return FadeInUp(
                            child: Card(
                              elevation: 4,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                              margin: EdgeInsets.symmetric(horizontal: 8),
                              child: Container(
                                width: 300,
                                child: Padding(
                                  padding: const EdgeInsets.all(16),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        children: [
                                          Icon(Icons.location_on,
                                              color: Colors.deepPurple,
                                              size: 30),
                                          SizedBox(width: 8),
                                          Expanded(
                                            child: Text(
                                              '${_offers[index].start_point} -> ${_offers[index].destination}',
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
                                        'Date: ${_offers[index].trip_date.toLocal()}',
                                        style: TextStyle(
                                            fontSize: 14,
                                            color: Colors.grey[600]),
                                      ),
                                      Text(
                                        'Time: ${_offers[index].startTime?.format(context) ?? 'N/A'}',
                                        style: TextStyle(
                                            fontSize: 14,
                                            color: Colors.grey[600]),
                                      ),
                                      Text(
                                        'Price: \$${_offers[index].price}',
                                        style: TextStyle(
                                            fontSize: 14,
                                            color: Colors.grey[600]),
                                      ),
                                      Text(
                                        'Seats Available: ${_offers[index].places}',
                                        style: TextStyle(
                                            fontSize: 14,
                                            color: Colors.grey[600]),
                                      ),
                                      Text(
                                        'Smoking Allowed: ${_offers[index].isSmokingAllowed ? 'Yes' : 'No'}',
                                        style: TextStyle(
                                            fontSize: 14,
                                            color: Colors.grey[600]),
                                      ),
                                      SizedBox(height: 10),
                                      Align(
                                        alignment: Alignment.centerRight,
                                        child: ElevatedButton(
                                          onPressed: () {},
                                          child: Text('Subscribe'),
                                          style: ElevatedButton.styleFrom(),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                    ),

                    SizedBox(height: 20),

                    // How CarPool Works
                    FadeInRight(
                      child: Text(
                        'How CarPool Works',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    SizedBox(height: 10),
                    FadeInRight(
                      child: Text(
                        'CarPool connects drivers with riders who are traveling the same route. This helps save money, reduce carbon emissions, and make new connections!',
                        style: TextStyle(fontSize: 16, color: Colors.grey[800]),
                      ),
                    ),

                    SizedBox(height: 20),

                    // Safety Tips
                    FadeInUp(
                      child: Text(
                        'Safety Tips',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    SizedBox(height: 10),
                    FadeInUp(
                      child: Text(
                        '1. Always confirm the driver’s identity and vehicle before getting in.\n'
                        '2. Share your trip details with a trusted contact.\n'
                        '3. Wear a mask and follow health guidelines during the ride.',
                        style: TextStyle(fontSize: 16, color: Colors.grey[800]),
                      ),
                    ),
                  ],
                ),
              ),
      ),
    );
  }
}
