import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:untitled/pages/AllOffers.dart';
import 'package:untitled/pages/FirstPage.dart';
import 'package:untitled/pages/OfferPost.dart';
import 'package:untitled/pages/Profil.dart';
import 'package:untitled/pages/login.dart';
import 'package:untitled/pages/notifications.dart';
import 'package:untitled/pages/register.dart';
import 'package:untitled/pages/homePage.dart';
import 'package:untitled/pages/addOffer.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'Services/setupLocator.dart';

final getIt = GetIt.instance;

void main() async{
  setupLocator();
  await dotenv.load(fileName: ".env");
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CarPool',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
scaffoldBackgroundColor: Colors.deepPurple.shade50,
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      routes: {
        'firstpage':(context)=> SplashScreen(),
        'login':(context)=>  LoginPage(),
        'register':(context)=> RegisterPage(),
        'home':(context)=>HomePage(),
        'offers':(context) =>Offers(),
        'profil':(context)=>Profil(),
        'add':(context)=>AddTripOffer(),
        'notifications':(context)=>Notifications(),
        'settings':(context)=>OfferPost()
    },
      initialRoute: 'firstpage',
      home: SplashScreen(),
    );
  }
}

  @override
  Widget build(BuildContext context) {
   return Scaffold(

   );
  }

