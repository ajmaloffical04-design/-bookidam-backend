import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/event_model.dart';
import 'dart:io' show Platform;
import 'package:flutter/foundation.dart' show kIsWeb;

class ApiService {
  // Use 10.0.2.2 for Android Emulator, localhost for iOS Sim/Web.
  static String get baseUrl {
    if (kIsWeb) return 'https://bookidam-backend.onrender.com/api';
    return 'https://bookidam-backend.onrender.com/api';
  }

  static Future<List<EventModel>> fetchEvents() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/events'));
      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);
        final List<dynamic> eventsJson = data['data'];
        return eventsJson.map((json) => EventModel.fromJson(json)).toList();
      }
    } catch (e) {
      print('Error fetching events: $e');
    }
    return [];
  }

  static Future<bool> submitBooking(Map<String, dynamic> bookingData) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/bookings'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(bookingData),
      );
      return response.statusCode == 200;
    } catch (e) {
      print('Error submitting booking: $e');
      return false;
    }
  }
}
