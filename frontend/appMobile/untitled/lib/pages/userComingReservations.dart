import 'package:flutter/material.dart';

class ComingReservation extends StatefulWidget {
  const ComingReservation({super.key});

  @override
  State<ComingReservation> createState() => _ComingReservationState();
}

class _ComingReservationState extends State<ComingReservation> {
  // Dummy data for reservations
  final List<Map<String, dynamic>> _reservations = [
    {
      "id": 1,
      "name": "John Doe",
      "date": "2024-11-20",
      "time": "10:00 AM",
      "status": "Pending",
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "date": "2024-11-21",
      "time": "2:00 PM",
      "status": "Pending",
    },
  ];

  // Function to handle accepting a reservation
  void _acceptReservation(int id) {
    setState(() {
      _reservations.firstWhere((reservation) => reservation['id'] == id)['status'] = 'Accepted';
    });
  }

  // Function to handle declining a reservation
  void _declineReservation(int id) {
    setState(() {
      _reservations.firstWhere((reservation) => reservation['id'] == id)['status'] = 'Declined';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Reservations'),
        backgroundColor: Colors.deepPurple,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: DataTable(
          columns: const [
            DataColumn(label: Text('Name')),
            DataColumn(label: Text('Date')),
            DataColumn(label: Text('Time')),
            DataColumn(label: Text('Actions')),
          ],
          rows: _reservations.map((reservation) {
            return DataRow(
              cells: [
                DataCell(Text(reservation['name'])),
                DataCell(Text(reservation['date'])),
                DataCell(Text(reservation['time'])),
                DataCell(Row(
                  children: [
                    ElevatedButton(
                      onPressed: () => _acceptReservation(reservation['id']),
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.deepPurple),
                      child: Text('Accept'),
                    ),
                    SizedBox(width: 8),
                    ElevatedButton(
                      onPressed: () => _declineReservation(reservation['id']),
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.deepPurple),
                      child: Text('Decline'),
                    ),
                  ],
                )),
              ],
            );
          }).toList(),
        ),
      ),
    );
  }
}
