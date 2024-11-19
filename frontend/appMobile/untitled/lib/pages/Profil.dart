import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:untitled/Components/bottomBar.dart';
import 'package:untitled/pages/userReservationsScreen.dart';

class Profil extends StatefulWidget {
  const Profil({super.key});

  @override
  State<Profil> createState() => _ProfilState();
}

class _ProfilState extends State<Profil> {
  Map<String, dynamic>? decodedToken;
  Map<String, dynamic>? userData;
  File? _image;
  final ImagePicker _picker = ImagePicker();

  TextEditingController _nameController = TextEditingController();
  TextEditingController _firstNameController = TextEditingController();
  TextEditingController _usernameController = TextEditingController();
  TextEditingController _emailController = TextEditingController();
  TextEditingController _phoneNumberController = TextEditingController();
  TextEditingController _cityController = TextEditingController();

  bool isSmoker = false;
  String gender = "Not specified";

  @override
  void initState() {
    super.initState();
    _currentUser();
  }

  Future<void> _pickImage() async {
    final pickedFile = await _picker.pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path);
        print(_image);
      });
    }
  }
Future<void> _updateUser(Map<String, dynamic>? userData) async{
  final userId = decodedToken!['userId'];
  print(userData);
  try{
      final response = await http.put(
        Uri.parse('http://192.168.4.14:3000/api/users/$userId'),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
         userData
        ),
      );
      if (response.statusCode == 200) {
        Fluttertoast.showToast(
          msg: "User updated !",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.deepPurple.shade100,
          textColor: Colors.white,
          fontSize: 16.0,
        );
      }else{
        Fluttertoast.showToast(
          msg: "error !",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0,
        );
      }
    }catch(e){
      print(e);
    }
}
  Future<void> _currentUser() async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      final String? token = prefs.getString('token');
      if (token != null) {
        setState(() {
          decodedToken = JwtDecoder.decode(token);
        });
        await _fetchUserData();
      }
    } catch (e) {
      print(e);
    }
  }

  Future<void> _fetchUserData() async {
    if (decodedToken != null && decodedToken!.containsKey('userId')) {
      final userId = decodedToken!['userId'];
      final response = await http
          .get(Uri.parse('http://192.168.4.14:3000/api/users/$userId'));
      if (response.statusCode == 200) {
        setState(() {
          userData = jsonDecode(response.body)['data'];
          _nameController.text = userData?['name'] ?? '';
          _firstNameController.text = userData?['first_name'] ?? '';
          _usernameController.text = userData?['username'] ?? '';
          _emailController.text = userData?['email'] ?? '';
          _phoneNumberController.text = userData?['phone_number'] ?? '';
          _cityController.text = userData?['city'] ?? '';
          isSmoker = userData?['isSmoker'] ?? false;
          gender = userData?['Gender'] ?? 'Not specified';
        });
      } else {
        print('Failed to fetch user data');
      }
    } else {
      print('Invalid token data');
    }
  }

  void _showPopup(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return SingleChildScrollView(
        child:
          Dialog(
          insetPadding: EdgeInsets.all(5),
          backgroundColor: Colors.deepPurple.shade50,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: StatefulBuilder(
          builder: (BuildContext context, StateSetter setState) {
            return Form(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    children: [
                      Icon(Icons.edit, color: Colors.deepPurple, size: 18,),
                      Text(
                        "Edit User Details",
                        style: TextStyle(
                            color: Colors.deepPurple,
                            fontSize: 18,
                            fontWeight: FontWeight.bold),
                      )

                    ],
                  ),

                  SizedBox(height: 15),
                  TextFormField(
                    controller: _firstNameController,
                    decoration: InputDecoration(
                      labelText: 'First Name',
                      labelStyle: TextStyle(color: Colors.deepPurple.shade300),
                    ),
                  ),
                  SizedBox(height: 15),
                  TextFormField(
                    controller: _nameController,
                    decoration: InputDecoration(
                      labelText: 'Last Name',
                      labelStyle: TextStyle(color: Colors.deepPurple.shade300),
                    ),
                  ),
                  SizedBox(height: 15),
                  TextFormField(
                    controller: _usernameController,
                    decoration: InputDecoration(
                      labelText: 'Username',
                      labelStyle: TextStyle(color: Colors.deepPurple.shade300),
                    ),
                  ),
                  SizedBox(height: 15),
                  TextFormField(
                    controller: _emailController,
                    decoration: InputDecoration(
                      labelText: 'Email',
                      labelStyle: TextStyle(color: Colors.deepPurple.shade300),
                    ),
                  ),
                  SizedBox(height: 15),
                  TextFormField(
                    controller: _phoneNumberController,
                    decoration: InputDecoration(
                      labelText: 'Phone Number',
                      labelStyle: TextStyle(color: Colors.deepPurple.shade300),
                    ),
                  ),
                  SizedBox(height: 15),
                  TextFormField(
                    controller: _cityController,
                    decoration: InputDecoration(
                      labelText: 'City',
                      labelStyle: TextStyle(color: Colors.deepPurple.shade300),
                    ),
                  ),
                  SizedBox(height: 15),
                  Row(
                    children: [
                      Expanded(
                        child: RadioListTile(
                          title: Text("Male"),
                          value: "Male",
                          groupValue: gender,
                          onChanged: (value) {
                            setState(() {
                              gender = value.toString();
                            });
                          },
                        ),
                      ),
                      Expanded(
                        child: RadioListTile(
                          title: Text("Female"),
                          value: "Female",
                          groupValue: gender,
                          onChanged: (value) {
                            setState(() {
                              gender = value.toString();
                            });
                          },
                        ),
                      ),
                    ],
                  ),
                  CheckboxListTile(
                    title: Text("Is Smoker"),
                    value: isSmoker,
                    onChanged: (value) {
                      setState(() {
                        isSmoker = value ?? false;
                      });
                    },
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton(
                        onPressed: () => Navigator.of(context).pop(),
                        child: Text("Cancel",
                            style: TextStyle(color: Colors.deepPurple)),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          setState(() {
                            userData?['name'] = _nameController.text;
                            userData?['first_name'] = _firstNameController.text;
                            userData?['username'] = _usernameController.text;
                            userData?['email'] = _emailController.text;
                            userData?['phone_number'] =
                                _phoneNumberController.text;
                            userData?['city'] = _cityController.text;
                            userData?['gender'] = gender;
                            userData?['isSmoker'] = isSmoker;
                          });
                          _updateUser(userData,);
                          Navigator.of(context).pop();
                        },
                        style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.deepPurple),
                        child: Text("Update",
                            style: TextStyle(color: Colors.white)),
                      ),
                    ],
                  ),
                ],
              ),
            );
          }
                )
          ),
        ));
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.grey,
        elevation: 0,
        title: Center(
          child: Text('Profile',
              style: TextStyle(color: Colors.black, fontSize: 20)),
        ),
      ),
      bottomNavigationBar: CustomBottomBar(),

      body: userData == null
          ? Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              child: Column(
                children: [
                  SizedBox(height: 20),
                  CircleAvatar(
                    radius: 50,
                    backgroundImage: _image != null
                        ? FileImage(_image!)
                        : (userData?['profilePicture'] != null
                                ? NetworkImage(userData?['profilePicture'])
                                : AssetImage('images/default_profile.jpg'))
                            as ImageProvider,
                  ),
                  IconButton(
                    icon: Icon(Icons.add_a_photo, color: Colors.blue),
                    onPressed: _pickImage,
                  ),
                  SizedBox(height: 10),
                  Text(userData?['name'] ?? 'Unknown',
                      style:
                          TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
                  Text(userData?['email'] ?? 'unknown@example.com',
                      style: TextStyle(fontSize: 16, color: Colors.grey)),
                  SizedBox(height: 20),
                  ListView(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    padding: EdgeInsets.symmetric(horizontal: 20),
                    children: [
                      _buildProfileOption(
                          icon: Icons.edit,
                          label: 'Edit Profile',
                          onTap: () => _showPopup(context)),
                      _buildProfileOption(icon: Icons.settings, label: 'Settings', onTap: (){
                        Navigator.pushNamed(context, 'settings');
                     }),
                      _buildProfileOption(icon: Icons.dark_mode, label: 'Dark mode', onTap: (){}),
                      _buildProfileOption(icon: Icons.help, label: 'Help', onTap: (){}),
                      _buildProfileOption(icon: Icons.info, label: 'About us', onTap: (){}),


                      _buildProfileOption(
                          icon: Icons.logout,
                          label: 'Logout',
                          color: Colors.red,
                          onTap: () {}),
                    ],
                  ),
                ],
              ),
            ),
    );
  }

  Widget _buildProfileOption(
      {required IconData icon,
      required String label,
      required VoidCallback onTap,
      Color color = Colors.deepPurple}) {
    return ListTile(
      leading: Icon(icon, color: color),
      title: Text(label, style: TextStyle(fontSize: 16)),
      trailing: Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
      onTap: onTap,
    );
  }
}
