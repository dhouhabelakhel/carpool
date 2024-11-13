import 'package:flutter/material.dart';

class EditProfil extends StatefulWidget {
  final user;
  const EditProfil({ this.user});

  @override
  State<EditProfil> createState() => _EditProfileState();
}

class _EditProfileState extends State<EditProfil> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit Profile'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            TextButton(onPressed: (){
              print(widget.user);
            }, child: Text("data"))
          ],
        ),
      ),
    );
  }
}
