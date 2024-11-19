import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class user {
  /// Obtenir les informations de l'utilisateur courant à partir du token
  Future<Map<String, dynamic>?> getCurrentUser() async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      final String? token = prefs.getString('token');

      if (token != null) {
        return JwtDecoder.decode(token);
      } else {
        print('No token found');
        return null;
      }
    } catch (e) {
      print('Error decoding token: $e');
      return null;
    }
  }

  /// Mettre à jour le mot de passe
  Future<void> updatePassword({
    required num id,
    required String oldPassword,
    required String newPassword,
  }) async {
    try {
      final String apiUrl = 'http://192.168.4.14:3000/api/users/update/$id';

      final Map<String, String> requestBody = {
        'old_password': oldPassword,
        'password': newPassword,
      };

      final response = await http.put(
        Uri.parse(apiUrl),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(requestBody),
      );
print(response.body);
      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        if (responseData['message'] == 'password updated succefully') {
          print('Password updated successfully');
        } else {
          print('Error: ${responseData['message']}');
        }
      } else {
        print('Failed to update password. Status code: ${response.statusCode}');
      }
    } catch (e) {
      print('Error updating password: $e');
    }
  }

  Future<Map<String, dynamic>?> getTripOffersByUserId(int id) async {
    try {
      final response = await http.get(Uri.parse('http://192.168.4.14:3000/api/tripOffers/user/$id'));

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else if (response.statusCode == 404) {
        return {'message': 'No trip offers found'};
      } else {
        throw Exception('Failed to fetch trip offers');
      }
    } catch (e) {
      print('Error fetching trip offers: $e');
      return null;
    }
  }
}
