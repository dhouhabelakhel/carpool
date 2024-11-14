import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:untitled/classes/tripOffer.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class AddTripOffer extends StatefulWidget {
  @override
  _AddTripOfferState createState() => _AddTripOfferState();
}

class _AddTripOfferState extends State<AddTripOffer> {
  final _formKey = GlobalKey<FormState>();
  Map<String, dynamic>? decodedToken;

  @override
  void initState() {
    super.initState();
    _currentUser(); // Initialize current user
  }

  Future<void> _currentUser() async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      final String? token = prefs.getString('token');
      if (token != null) {
        setState(() {
          decodedToken = JwtDecoder.decode(token);
        });
      }
    } catch (e) {
      print(e);
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

      try {
        final response = await http.post(
          Uri.parse('http://192.168.1.4:3000/api/tripOffers'),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(newOffer.toJson()),
        );

        if (response.statusCode == 201) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Trip offer created successfully')),
          );
          Navigator.of(context).pop();
        } else {
          throw Exception('Failed to create trip offer');
        }
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')),
        );
      }
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
