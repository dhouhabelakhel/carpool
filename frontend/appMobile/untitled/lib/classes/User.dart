import 'package:flutter/material.dart';

class User {
  final int id;
  final String name;
  final String first_name;
  final String username;
  final String email;
  final String password;
  final String photo;
  final DateTime birthdate;
  final Enum Gender;
  final String phone_number;
  final String city;
  final bool isSmoker;

  User({
    required this.id,
    required this.name,
    required this.first_name,
    required this.username,
    required this.email,
    required this.password,
    required this.photo,
    required this.birthdate,
    required this.Gender,
    required this.phone_number,
    required this.city,
    required this.isSmoker
  });


}
