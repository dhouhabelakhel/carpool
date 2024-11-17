import 'package:shared_preferences/shared_preferences.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class user {
  /// Obtenir les informations de l'utilisateur courant à partir du token
  Future<Map<String, dynamic>?> getCurrentUser() async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      final String? token = prefs.getString('token');

      if (token != null) {
        // Décoder le token JWT
        return JwtDecoder.decode(token);
      } else {
        print('No token found');
        return null; // Aucun token trouvé
      }
    } catch (e) {
      print('Error decoding token: $e');
      return null; // Retourne `null` en cas d'erreur
    }
  }

}
