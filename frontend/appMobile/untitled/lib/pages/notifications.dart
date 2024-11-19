import 'package:flutter/material.dart';
import 'package:untitled/Components/appBar.dart';
import 'package:untitled/classes/carpoolOffer.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:animate_do/animate_do.dart';
import 'package:untitled/Components/bottomBar.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:elegant_notification/elegant_notification.dart';

class Notifications extends StatefulWidget {
  const Notifications({super.key});

  @override
  State<Notifications> createState() => _NotificationsState();
}

class _NotificationsState extends State<Notifications> {
  List<CarpoolOffer> _offers = [];
  late IO.Socket socket;

  void _setupSocket() {
    socket = IO.io('http://192.168.1.4:3000', <String, dynamic>{
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
      setState(() {
        _offers.add(CarpoolOffer.fromJson(data));
      });
      // Show a notification when a new offer is received
      ElegantNotification.success(
        description: Text("New Carpool offer available now!"),
      ).show(context);
    });
  }

  @override
  void initState() {
    super.initState();
    _setupSocket();
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
                'Time: ${offer.startTime}',
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
                  style: ElevatedButton.styleFrom(
                  ),
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
      appBar: CustomAppBar(new_offer: false),
      bottomNavigationBar: CustomBottomBar(),
      body: SafeArea(
        child: _offers.isEmpty
            ? Center(
          child: SpinKitWave(
            color: Colors.deepPurple,
            size: 50.0,
          ),
        )
            : ListView.builder(
          padding: EdgeInsets.all(15),
          itemCount: _offers.length,
          itemBuilder: (context, index) {
            return _buildOfferCard(_offers[index]);
          },
        ),
      ),
    );
  }
}
