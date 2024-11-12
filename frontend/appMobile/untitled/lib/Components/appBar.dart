import 'package:flutter/material.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {


  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: Colors.grey,
      actions: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child:
          ElevatedButton(onPressed: (){
            Navigator.pushNamed(context, 'profil');
          },
    child:
    CircleAvatar(
            child: Image.asset('images/pool.svg'),

          ))
        ),
      ],
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);
}
