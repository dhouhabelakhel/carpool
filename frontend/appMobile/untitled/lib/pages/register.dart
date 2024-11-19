import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_svg/flutter_svg.dart';

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  Future<void> _register() async {
    try {
      final response = await http.post(
        Uri.parse('http://192.168.4.14:3000/api/users'),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({
          'first_name': _firstNameController.text,
          'name': _nameController.text,
          'email': _emailController.text,
          'password': _passwordController.text,
        }),
      );

      if (response.statusCode == 201) {
        Fluttertoast.showToast(
          msg: "Welcome !",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.deepPurple.shade100,
          textColor: Colors.white,
          fontSize: 16.0,
        );
      } else {
        Fluttertoast.showToast(
          msg: "verifier vos donnees !",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0,
        );
        Navigator.pushNamed(context, 'home');
      }
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                FadeInDown(
                  duration: Duration(seconds: 1),
                  child: SvgPicture.asset(
                    'images/register.svg',
                    height: 200,
                  ),
                ),
                SizedBox(height: 25),
                Text(
                  "Sign Up",
                  style: TextStyle(
                    fontSize: 25,
                    fontWeight: FontWeight.bold,
                    color: Colors.deepPurple.shade400,
                  ),
                  textAlign: TextAlign.left,
                ),
                SizedBox(height: 20),
                Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: TextFormField(
                              controller: _firstNameController,
                              decoration: InputDecoration(
                                labelText: 'First Name',
                                labelStyle: TextStyle(
                                  color: Colors.deepPurple.shade300
                                ),
                                border: UnderlineInputBorder(),

                              ),
                            ),
                          ),
                          SizedBox(width: 10),
                          Expanded(
                            child: TextFormField(
                              controller: _nameController,
                              decoration: InputDecoration(
                                labelText: 'Last Name',
                                labelStyle: TextStyle(
                                    color: Colors.deepPurple.shade300
                                ),
                                border: UnderlineInputBorder(),

                              ),
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 15),
                      TextFormField(
                        controller: _emailController,
                        decoration: InputDecoration(
                          labelText: 'Email',
                          labelStyle: TextStyle(
                              color: Colors.deepPurple.shade300
                          ),
                          border: UnderlineInputBorder(),

                        ),
                      ),
                      SizedBox(height: 15),
                      TextFormField(
                        controller: _passwordController,
                        decoration: InputDecoration(
                          labelText: 'Password',
                          labelStyle: TextStyle(
                              color: Colors.deepPurple.shade300
                          ),
                          border: UnderlineInputBorder(),

                        ),
                        obscureText: true,
                      ),
                      SizedBox(height: 20),
                      TextButton(
                        onPressed: _register,
                        style: ElevatedButton.styleFrom(
                          padding: EdgeInsets.symmetric(horizontal: 50, vertical: 15),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                        child: Text(
                          'Sign Up',
                          style: TextStyle(color: Colors.deepPurple.shade300),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
