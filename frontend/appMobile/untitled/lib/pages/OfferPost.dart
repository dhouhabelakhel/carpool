import 'package:flutter/material.dart';
import 'package:untitled/Services/user.service.dart';
import 'package:untitled/pages/userComingReservations.dart';
import 'package:untitled/pages/userReservationsScreen.dart';
import '../Components/bottomBar.dart';
import 'myOffers.dart';

class OfferPost extends StatelessWidget {
  const OfferPost({super.key});

  Widget _buildProfileOption({
    required IconData icon,
    required String label,
    required VoidCallback onTap,
  }) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: ListTile(
        leading: Container(
          padding: const EdgeInsets.all(8.0),
          decoration: BoxDecoration(
            color: Colors.deepPurple.withOpacity(0.1),
            shape: BoxShape.circle,
          ),
          child: Icon(icon, color: Colors.deepPurple),
        ),
        title: Text(
          label,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
        trailing: const Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
        onTap: onTap,
      ),
    );
  }

  void _showPasswordUpdateDialog(BuildContext context) {
    final TextEditingController oldPasswordController = TextEditingController();
    final TextEditingController newPasswordController = TextEditingController();
    final _formKey = GlobalKey<FormState>();
    final userService = user();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          title: const Text(
            'Update Password',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          content: Form(
            key: _formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: oldPasswordController,
                  obscureText: true,
                  decoration: InputDecoration(
                    labelText: 'Old Password',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your old password';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 15),
                TextFormField(
                  controller: newPasswordController,
                  obscureText: true,
                  decoration: InputDecoration(
                    labelText: 'New Password',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your new password';
                    } else if (value.length < 6) {
                      return 'Password must be at least 6 characters';
                    }
                    return null;
                  },
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              onPressed: () async {
                if (_formKey.currentState!.validate()) {
                  final oldPassword = oldPasswordController.text;
                  final newPassword = newPasswordController.text;

                  try {
                    final decodedToken = await userService.getCurrentUser();
                    if (decodedToken != null && decodedToken['userId'] != null) {
                      final userId = decodedToken['userId'];
                      await userService.updatePassword(
                        id: userId,
                        oldPassword: oldPassword,
                        newPassword: newPassword,
                      );
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Password updated successfully!')),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('User not found!')),
                      );
                    }
                  } catch (e) {
                    // Handle error
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Error: $e')),
                    );
                  }

                  Navigator.of(context).pop();
                }
              },
              child: const Text('Update'),
            ),
          ],
        );
      },
    );
  }


  @override
  Widget build(BuildContext context) {
    // Simulating decoded token for demonstration. Replace with actual logic.
    Map<String, dynamic>? decodedToken = {'userId': 12}; // Example userId

    return Scaffold(
      bottomNavigationBar: CustomBottomBar(),
      body: Column(
        children: [
          // Header Section
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 20.0),
            decoration: const BoxDecoration(
              color: Colors.deepPurple,
              borderRadius: BorderRadius.only(
                bottomLeft: Radius.circular(24),
                bottomRight: Radius.circular(24),
              ),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                SizedBox(height: 10),
                SizedBox(height: 5),
                Text(
                  'Manage your account and services',
                  style: TextStyle(
                    color: Colors.white70,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 200),
          Expanded(
            child: SingleChildScrollView(
              child: Column(
                children: [
                  _buildProfileOption(
                    icon: Icons.lock,
                    label: 'Change Password',
                    onTap: () {
                      _showPasswordUpdateDialog(context);
                    },
                  ),
                  _buildProfileOption(
                    icon: Icons.local_offer,
                    label: 'View Offers',
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => TripOffersPage(userId: decodedToken['userId']),
                        ),
                      );
                    },
                  ),
                  _buildProfileOption(
                    icon: Icons.local_offer,
                    label: 'View Coming reservations',
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ComingReservation(),
                        ),
                      );
                    },
                  ),
                  _buildProfileOption(
                    icon: Icons.book_online,
                    label: 'My Reservations',
                    onTap: () {
                      if (decodedToken != null &&
                          decodedToken.containsKey('userId')) {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => UserReservationsScreen(
                              userId: decodedToken['userId'],
                            ),
                          ),
                        );
                      } else {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('User information not available.'),
                          ),
                        );
                      }
                    },
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
