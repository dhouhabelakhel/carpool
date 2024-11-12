import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Profil extends StatefulWidget {
  const Profil({super.key});

  @override
  State<Profil> createState() => _ProfilState();
}

class _ProfilState extends State<Profil> {
  Map<String, dynamic>? decodedToken;
  Map<String, dynamic>? userData;

  @override
  void initState() {
    super.initState();
    _currentUser();
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
      final response = await http.get(Uri.parse('http://192.168.1.4:3000/api/users/$userId'));
      if (response.statusCode == 200) {
        setState(() {
          userData = jsonDecode(response.body)['data'];
        });
      } else {
        print('Failed to fetch user data');
      }
    } else {
      print('Invalid token data');
    }
  }

  Widget _buildProfileOption({required IconData icon, required String label, Color color = Colors.black}) {
    return ListTile(
      leading: Icon(icon, color: color),
      title: Text(label, style: TextStyle(fontSize: 16)),
      trailing: Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
      onTap: () {
        // Define your onTap action here
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        iconTheme: IconThemeData(color: Colors.black),
        title: Center(
          child: Text(
            'Profile',
            style: TextStyle(color: Colors.black, fontSize: 20),
          ),
        ),
      ),
      body: userData == null
          ? Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(height: 20),
            CircleAvatar(
              radius: 50,
              backgroundImage: userData?['profilePicture'] != null
                  ? NetworkImage(userData!['profilePicture'])
                  : AssetImage('assets/default_profile.jpg') as ImageProvider,
            ),
            SizedBox(height: 10),
            Text(
              userData?['name'] ?? 'Unknown',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            Text(
              userData?['email'] ?? 'unknown@example.com',
              style: TextStyle(fontSize: 16, color: Colors.grey),
            ),
            SizedBox(height: 20),
            ListView(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              padding: EdgeInsets.symmetric(horizontal: 20),
              children: [
                _buildProfileOption(icon: Icons.edit, label: 'Edit Profile'),
                _buildProfileOption(icon: Icons.settings, label: 'Settings'),
                _buildProfileOption(icon: Icons.security, label: 'Security'),
                _buildProfileOption(icon: Icons.brightness_4, label: 'Dark Mode'),
                _buildProfileOption(icon: Icons.language, label: 'Language'),
                _buildProfileOption(icon: Icons.info, label: 'Terms and Services'),
                _buildProfileOption(icon: Icons.help, label: 'Help'),
                _buildProfileOption(icon: Icons.logout, label: 'Logout', color: Colors.red),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
