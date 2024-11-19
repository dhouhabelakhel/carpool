import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:untitled/Components/appBar.dart';
import 'package:untitled/Services/TripOffers.service.dart';
import 'dart:convert';
import 'package:untitled/classes/carpoolOffer.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:animate_do/animate_do.dart';
import 'package:untitled/Components/bottomBar.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:elegant_notification/elegant_notification.dart';
import 'package:untitled/main.dart';

import '../classes/tripOffer.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool _new_offer = false;
  late IO.Socket socket;
  TextEditingController total_price=TextEditingController();
  TextEditingController reservationSeatsController = TextEditingController();
TextEditingController dateController=TextEditingController();
  List<CarpoolOffer> _offers = [];
  final tripOfferService = getIt<TripOffers>();
  @override
  void initState() {
    super.initState();
    _fetchOffers();
    _setupSocket();
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



  void _setupSocket() {
    socket = IO.io('http://192.168.4.14:3000', <String, dynamic>{
      'transports': ['websocket', 'polling'],
      'autoConnect': true,
    });

    socket.on('connect', (_) {
      print('Connected to socket server');
    });

    socket.on('disconnect', (_) {
      print('Disconnected from socket server');
    });
    socket.on('newTripOffer', (data) {
      print('New trip offer received: $data');
      setState(() {
        _new_offer = true;
        _offers.add(CarpoolOffer.fromJson(data));
      });
      ElegantNotification.success(
        description: Text("New Carpool offer available now!"),
        toastDuration: Duration(minutes: 4),
      ).show(context);
    });
  }

  @override
  void dispose() {
    socket.disconnect();
    socket.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(new_offer: _new_offer),
      bottomNavigationBar: CustomBottomBar(),
      body: SafeArea(
        child: _offers.isEmpty
            ? Center(
                child: SpinKitWave(color: Colors.deepPurple, size: 50.0),
              )
            : SingleChildScrollView(
                padding: EdgeInsets.all(15),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
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
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        FadeIn(
                          duration: Duration(milliseconds: 500),
                          child: ElevatedButton.icon(
                            onPressed: () {
                              Navigator.pushNamed(context, 'add');
                            },
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
                            onPressed: () {
                              Navigator.pushNamed(context, 'offers');
                            },
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
                    Row(
                      children: [
                        FadeInLeft(
                          child: Text(
                            'Latest Carpool Offers',
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        FadeInRight(
                          child: TextButton(
                            onPressed: () {
                              Navigator.pushNamed(context, 'offers');
                            },
                            child: Text("Show more"),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 20),
                    SizedBox(
                      height: 280,
                      child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: _offers.length,
                        itemBuilder: (context, index) {
                          return FadeInUp(
                            child: Card(
                              elevation: 4,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                              margin: EdgeInsets.symmetric(horizontal: 8.0),
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
                                          SizedBox(width: 8.0),
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
                                        'Price: ${_offers[index].price}DT',
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
                                          onPressed: () {
                                            tripOfferService.subscribeInfos(context,_offers[index].id,total_price,reservationSeatsController,dateController);
                                          },
                                          child: Text('Subscribe'),
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
