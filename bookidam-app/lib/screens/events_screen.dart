import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:bookidam/theme/app_theme.dart';
import 'package:bookidam/models/event_model.dart';
import 'package:bookidam/services/api_service.dart';

class EventsScreen extends StatefulWidget {
  const EventsScreen({super.key});

  @override
  State<EventsScreen> createState() => _EventsScreenState();
}

class _EventsScreenState extends State<EventsScreen> {
  bool _isLoading = true;
  List<EventModel> _events = [];
  String _searchQuery = '';

  @override
  void initState() {
    super.initState();
    _fetchEvents();
  }

  Future<void> _fetchEvents() async {
    final events = await ApiService.fetchEvents();
    if (mounted) {
      setState(() {
        _events = events;
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final filteredEvents = _events.where((event) {
      return event.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
             event.location.toLowerCase().contains(_searchQuery.toLowerCase()) ||
             event.type.toLowerCase().contains(_searchQuery.toLowerCase());
    }).toList();

    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Discover', style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppTheme.textLightColor)),
                  Text('PREMIUM EVENTS', style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 28, color: AppTheme.primaryBlue, letterSpacing: -0.5)),
                  const SizedBox(height: 20),
                  
                  // Search Bar
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.05),
                          blurRadius: 10,
                          offset: const Offset(0, 4),
                        )
                      ],
                    ),
                    child: TextField(
                      onChanged: (value) => setState(() => _searchQuery = value),
                      decoration: const InputDecoration(
                        hintText: 'Search events, locations...',
                        prefixIcon: Icon(Icons.search, color: AppTheme.primaryBlue),
                        border: InputBorder.none,
                        contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Events List
            Expanded(
              child: RefreshIndicator(
                color: AppTheme.primaryBlue,
                onRefresh: _fetchEvents,
                child: _isLoading 
                  ? const Center(child: CircularProgressIndicator(color: AppTheme.primaryBlue))
                  : filteredEvents.isEmpty
                    ? const Center(child: Text("No events found", style: TextStyle(color: AppTheme.textLightColor)))
                    : ListView.builder(
                        padding: const EdgeInsets.symmetric(horizontal: 24),
                        itemCount: filteredEvents.length,
                        itemBuilder: (context, index) {
                          final event = filteredEvents[index];
                          return _buildEventCard(event);
                        },
                      ),
              ),
            ),
            const SizedBox(height: 100), // Space for bottom nav
          ],
        ),
      ),
    );
  }

  Widget _buildEventCard(EventModel event) {
    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(24),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Container(
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.7),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Colors.white.withOpacity(0.8), width: 1.5),
              boxShadow: [
                BoxShadow(
                  color: AppTheme.primaryBlue.withOpacity(0.05),
                  blurRadius: 15,
                  offset: const Offset(0, 8),
                )
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Image
                Container(
                  height: 160,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    image: event.imageUrl != null && event.imageUrl!.isNotEmpty
                      ? DecorationImage(
                          image: NetworkImage(event.imageUrl!),
                          fit: BoxFit.cover,
                        )
                      : null,
                  ),
                  child: event.imageUrl == null || event.imageUrl!.isEmpty
                    ? const Center(child: Icon(Icons.calendar_today, size: 40, color: Colors.grey))
                    : null,
                ),
                // Details
                Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: AppTheme.primaryBlue.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              event.type.toUpperCase(),
                              style: const TextStyle(color: AppTheme.primaryBlue, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1),
                            ),
                          ),
                          Text(
                            event.date.length >= 10 ? event.date.substring(0, 10) : event.date,
                            style: const TextStyle(color: AppTheme.textLightColor, fontSize: 12),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Text(
                        event.title,
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.textColor),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          const Icon(Icons.location_on, size: 16, color: AppTheme.textLightColor),
                          const SizedBox(width: 4),
                          Text(event.location, style: const TextStyle(color: AppTheme.textLightColor)),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
