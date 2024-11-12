import 'package:flutter/material.dart';
import 'package:untitled/pages/AllOffers.dart';
import 'package:untitled/pages/FirstPage.dart';
import 'package:untitled/pages/Profil.dart';
import 'package:untitled/pages/login.dart';
import 'package:untitled/pages/register.dart';
import 'package:untitled/pages/homePage.dart';

void main() {
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

