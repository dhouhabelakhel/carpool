import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import 'package:untitled/Services/user.service.dart';
import 'package:untitled/Services/user.service.dart';
import 'dart:convert';
import 'package:untitled/classes/tripOffer.dart';
import 'package:untitled/main.dart';

import '../Services/TripOffers.service.dart';
import '../Services/user.service.dart';

class AddTripOffer extends StatefulWidget {
  @override
  _AddTripOfferState createState() => _AddTripOfferState();
}

class _AddTripOfferState extends State<AddTripOffer> {
  final _formKey = GlobalKey<FormState>();
  Map<String, dynamic>? decodedToken;
  final tripOfferService=getIt<TripOffers>();
  final userService=getIt<user>();

  @override
  void initState() {
    super.initState();
    _getCurrentUser();
  }
  Future<void> _getCurrentUser() async {
    try {
      Map<String, dynamic>? decodedtoken = await userService.getCurrentUser();
      setState(() {
        decodedToken = decodedtoken;
      });
    } catch (e) {
      print('Error fetching current user: $e');
    }
  }

  String _tripDate = '';
  String _startTime = '';
  double _price = 0.0;
  int _places = 0;
  bool _isSmokingAllowed = false;
  String _destination = '';
  String _startPoint = '';

  Future<void> _submitForm() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      TripOffer newOffer = TripOffer(
        tripDate: _tripDate,
        startTime: _startTime,
        price: _price,
        places: _places,
        isSmokingAllowed: _isSmokingAllowed,
        userId: decodedToken?['userId'] ?? 0,
        destination: _destination,
        startPoint: _startPoint,
      );
      print(decodedToken);
 tripOfferService.addCarpoolOffer(newOffer);
      Fluttertoast.showToast(
        msg: "Added succesfully",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.deepPurple,
        textColor: Colors.white,
        fontSize: 16.0,
      );
 Navigator.pushNamed(context, 'home');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Add Trip Offer')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                decoration: InputDecoration(labelText: 'Trip Date'),
                onSaved: (value) => _tripDate = value!,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a trip date';
                  }
                  return null;
                },
                onTap: () async {
                  DateTime? pickedDate = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime.now(),
                    lastDate: DateTime(2101),
                  );
                  if (pickedDate != null) {
                    setState(() {
                      _tripDate = DateFormat('yyyy-MM-dd').format(pickedDate);
                    });
                  }
                },
                readOnly: true,
                controller: TextEditingController(text: _tripDate),
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Start Time'),
                onSaved: (value) => _startTime = value!,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a start time';
                  }
                  return null;
                },
                onTap: () async {
                  TimeOfDay? pickedTime = await showTimePicker(
                    context: context,
                    initialTime: TimeOfDay.now(),
                  );
                  if (pickedTime != null) {
                    setState(() {
                      _startTime = pickedTime.format(context);
                    });
                  }
                },
                readOnly: true,
                controller: TextEditingController(text: _startTime),
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Price'),
                keyboardType: TextInputType.number,
                onSaved: (value) => _price = double.parse(value!),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a price';
                  }
                  return null;
                },
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Places'),
                keyboardType: TextInputType.number,
                onSaved: (value) => _places = int.parse(value!),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter the number of places';
                  }
                  return null;
                },
              ),
              SwitchListTile(
                title: Text('Smoking Allowed'),
                value: _isSmokingAllowed,
                onChanged: (value) {
                  setState(() {
                    _isSmokingAllowed = value;
                  });
                },
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Destination'),
                onSaved: (value) => _destination = value!,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a destination';
                  }
                  return null;
                },
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Start Point'),
                onSaved: (value) => _startPoint = value!,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a start point';
                  }
                  return null;
                },
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _submitForm,
                child: Text('Add Trip Offer'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
