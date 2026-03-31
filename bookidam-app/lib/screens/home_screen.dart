import 'dart:ui';
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
          color: AppTheme.primaryBlue,
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
                          Text('BOOKIDAM', style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 32, color: AppTheme.primaryBlue)),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.all(2),
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: AppTheme.primaryBlue.withOpacity(0.2)),
                        ),
                        child: const CircleAvatar(
                          radius: 22,
                          backgroundColor: AppTheme.accentLightBlue,
                          child: Icon(Icons.person_rounded, color: AppTheme.primaryBlue),
                        ),
                      )
                    ],
                  ),
                  const SizedBox(height: 24),

                  // Premium Search Bar (Glass)
                  ClipRRect(
                    borderRadius: BorderRadius.circular(20),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.5),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: Colors.black.withOpacity(0.05)),
                        ),
                        child: TextField(
                          decoration: InputDecoration(
                            hintText: 'Search exclusive events...',
                            prefixIcon: const Icon(Icons.search_rounded, color: AppTheme.primaryBlue),
                            fillColor: Colors.transparent,
                            filled: true,
                            border: InputBorder.none,
                            enabledBorder: InputBorder.none,
                            focusedBorder: InputBorder.none,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),

                  // Hero Banner (Liquid Glass)
                  ClipRRect(
                    borderRadius: BorderRadius.circular(24),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                      child: Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(24),
                        decoration: BoxDecoration(
                          color: AppTheme.primaryBlue.withOpacity(0.85),
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(color: Colors.white.withOpacity(0.3), width: 1.5),
                          boxShadow: [
                            BoxShadow(
                              color: AppTheme.primaryBlue.withOpacity(0.2),
                              blurRadius: 20,
                              offset: const Offset(0, 10),
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
                                backgroundColor: Colors.white.withOpacity(0.9),
                                foregroundColor: AppTheme.primaryBlue,
                                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                                elevation: 0,
                              ),
                              child: const Text('Book Now'),
                            )
                          ],
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 32),
                  
                  // Category Filter Chips (Liquid Glass style)
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    physics: const BouncingScrollPhysics(),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 4),
                      child: Row(
                        children: [
                          _buildCategoryChip('All Events', true),
                          _buildCategoryChip('Music', false),
                          _buildCategoryChip('Corporate', false),
                          _buildCategoryChip('Technology', false),
                          _buildCategoryChip('Seminars', false),
                        ],
                      ),
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
                        child: const Text('See All', style: TextStyle(color: AppTheme.primaryBlue, fontWeight: FontWeight.w600)),
                      )
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Horizontal List of API Events
                  if (_isLoading)
                    const Center(child: Padding(
                      padding: EdgeInsets.all(32.0),
                      child: CircularProgressIndicator(color: AppTheme.primaryBlue),
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
                            margin: const EdgeInsets.only(right: 16),
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(24),
                              child: BackdropFilter(
                                filter: ImageFilter.blur(sigmaX: 15, sigmaY: 15),
                                child: Container(
                                  width: 240,
                                  decoration: BoxDecoration(
                                    color: Colors.white.withOpacity(0.6),
                                    borderRadius: BorderRadius.circular(24),
                                    border: Border.all(color: Colors.white.withOpacity(0.8), width: 1.5),
                                    boxShadow: [
                                      BoxShadow(
                                        color: AppTheme.primaryBlue.withOpacity(0.08),
                                        blurRadius: 20,
                                        spreadRadius: -2,
                                        offset: const Offset(0, 8),
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
                                          borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
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
                                              style: const TextStyle(color: AppTheme.primaryBlue, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.2),
                                            ),
                                            const SizedBox(height: 6),
                                            Text(
                                              event.title,
                                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppTheme.textColor),
                                              maxLines: 1,
                                              overflow: TextOverflow.ellipsis,
                                            ),
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
                                            const SizedBox(height: 8),
                                            Row(
                                              children: [
                                                const Icon(Icons.confirmation_num_outlined, size: 14, color: AppTheme.primaryBlue),
                                                const SizedBox(width: 4),
                                                Text(
                                                  '₹${event.singleDayPrice ?? 0} / slot',
                                                  style: const TextStyle(color: AppTheme.primaryBlue, fontSize: 13, fontWeight: FontWeight.bold),
                                                ),
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
                        },
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
    );
  }

  Widget _buildCategoryChip(String label, bool isSelected) {
    return Container(
      margin: const EdgeInsets.only(right: 12),
      child: Chip(
        label: Text(label),
        labelStyle: TextStyle(
          color: isSelected ? Colors.white : AppTheme.textColor,
          fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
          fontSize: 12,
        ),
        backgroundColor: isSelected ? AppTheme.primaryBlue : Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(100),
          borderSide: BorderSide(
            color: isSelected ? AppTheme.primaryBlue : Colors.black.withOpacity(0.05),
          ),
        ),
      ),
    );
  }
}
