import 'package:flutter/material.dart';
import 'package:bookidam/theme/app_theme.dart';
import 'package:bookidam/models/event_model.dart';
import 'package:bookidam/services/api_service.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool _isLoading = true;
  List<EventModel> _events = [];

  @override
  void initState() {
    super.initState();
    _fetchEvents();
  }

  Future<void> _fetchEvents() async {
    final events = await ApiService.fetchEvents();
    setState(() {
      _events = events;
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      body: SafeArea(
        child: RefreshIndicator(
          color: AppTheme.primaryGreen,
          onRefresh: _fetchEvents,
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // App Bar / Header Area
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Welcome to', style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppTheme.textLightColor)),
                          Text('BOOKIDAM', style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 28, color: AppTheme.primaryGreen, letterSpacing: -0.5)),
                        ],
                      ),
                      const CircleAvatar(
                        radius: 22,
                        backgroundColor: AppTheme.accentLightGreen,
                        child: Icon(Icons.person, color: AppTheme.primaryGreen),
                      )
                    ],
                  ),
                  const SizedBox(height: 32),

                  // Hero Banner
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [AppTheme.primaryGreen, Color(0xFF27AE60)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(20),
                      boxShadow: [
                        BoxShadow(
                          color: AppTheme.primaryGreen.withOpacity(0.3),
                          blurRadius: 15,
                          offset: const Offset(0, 8),
                        )
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          "Book Any Event.\nWe Handle the Rest.",
                          style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold, height: 1.3),
                        ),
                        const SizedBox(height: 16),
                        ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.white,
                            foregroundColor: AppTheme.primaryGreen,
                            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                          ),
                          child: const Text('Book Now'),
                        )
                      ],
                    ),
                  ),

                  const SizedBox(height: 32),
                  
                  // Featured Events Section
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Featured Events', style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 20)),
                      TextButton(
                        onPressed: () {},
                        child: const Text('See All', style: TextStyle(color: AppTheme.primaryGreen, fontWeight: FontWeight.w600)),
                      )
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Horizontal List of API Events
                  if (_isLoading)
                    const Center(child: Padding(
                      padding: EdgeInsets.all(32.0),
                      child: CircularProgressIndicator(color: AppTheme.primaryGreen),
                    ))
                  else if (_events.isEmpty)
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(32),
                      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
                      child: const Center(
                        child: Text("No upcoming events right now.", style: TextStyle(color: AppTheme.textLightColor)),
                      ),
                    )
                  else
                    SizedBox(
                      height: 280,
                      child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: _events.length,
                        itemBuilder: (context, index) {
                          final event = _events[index];
                          return Container(
                            width: 240,
                            margin: const EdgeInsets.only(right: 16),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(20),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.04),
                                  blurRadius: 10,
                                  offset: const Offset(0, 4),
                                )
                              ],
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                // Event Image Background
                                Container(
                                  height: 140,
                                  decoration: BoxDecoration(
                                    borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
                                    color: Colors.grey[200],
                                    image: event.imageUrl != null && event.imageUrl!.isNotEmpty
                                        ? DecorationImage(
                                            image: NetworkImage(event.imageUrl!), 
                                            fit: BoxFit.cover,
                                            onError: (exception, stackTrace) => const AssetImage('assets/placeholder.png'), // fallback handling
                                          )
                                        : null,
                                  ),
                                  child: event.imageUrl == null || event.imageUrl!.isEmpty
                                      ? const Center(child: Icon(Icons.calendar_month, color: Colors.grey, size: 40))
                                      : null,
                                ),
                                // Event Details
                                Padding(
                                  padding: const EdgeInsets.all(16.0),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        event.type.toUpperCase(),
                                        style: const TextStyle(color: AppTheme.primaryGreen, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.2),
                                      ),
                                      const SizedBox(height: 6),
                                      Text(
                                        event.title,
                                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppTheme.textColor),
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                      const SizedBox(height: 12),
                                      Row(
                                        children: [
                                          const Icon(Icons.location_on, size: 14, color: AppTheme.textLightColor),
                                          const SizedBox(width: 4),
                                          Expanded(
                                            child: Text(
                                              event.location,
                                              style: const TextStyle(color: AppTheme.textLightColor, fontSize: 12),
                                              maxLines: 1,
                                              overflow: TextOverflow.ellipsis,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
