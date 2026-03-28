import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:bookidam/theme/app_theme.dart';
import 'package:bookidam/services/api_service.dart';

class BookingScreen extends StatefulWidget {
  const BookingScreen({super.key});

  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  final _formKey = GlobalKey<FormState>();
  bool _isSubmitting = false;

  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _eventNameController = TextEditingController();
  final TextEditingController _eventDateController = TextEditingController();
  final TextEditingController _locationController = TextEditingController();
  final TextEditingController _budgetController = TextEditingController();
  final TextEditingController _descController = TextEditingController();

  String _selectedEventType = 'Corporate Event';

  final List<String> _eventTypes = [
    'Corporate Event',
    'Tournament',
    'Cultural Programme',
    'Private Party',
    'Seminar',
    'Summit',
    'Other'
  ];

  @override
  void dispose() {
    _nameController.dispose();
    _phoneController.dispose();
    _emailController.dispose();
    _eventNameController.dispose();
    _eventDateController.dispose();
    _locationController.dispose();
    _budgetController.dispose();
    _descController.dispose();
    super.dispose();
  }

  Future<void> _submitBooking() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isSubmitting = true;
    });

    final bookingData = {
      'clientName': _nameController.text,
      'phone': _phoneController.text,
      'email': _emailController.text,
      'eventType': _selectedEventType,
      'eventName': _eventNameController.text,
      'eventDate': _eventDateController.text,
      'preferredTime': '',
      'preferredLocation': _locationController.text,
      'budget': _budgetController.text,
      'description': _descController.text,
    };

    final success = await ApiService.submitBooking(bookingData);

    setState(() {
      _isSubmitting = false;
    });

    if (success) {
      if (mounted) {
        _showSuccessDialog();
      }
    } else {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to submit booking. Please try again.'),
            backgroundColor: Colors.redAccent,
          ),
        );
      }
    }
  }

  void _showSuccessDialog() {
    showDialog(
      context: context,
      builder: (ctx) => BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
        child: AlertDialog(
          backgroundColor: Colors.white.withOpacity(0.9),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
          title: const Column(
            children: [
              Icon(Icons.check_circle_outline, color: Color(0xFF00A372), size: 64),
              SizedBox(height: 16),
              Text('Booking Received!', 
                textAlign: TextAlign.center,
                style: GoogleFonts.outfit(fontWeight: FontWeight.w900, fontSize: 24, color: AppTheme.textColor)
              ),
            ],
          ),
          content: const Text(
            'Thank you for reaching out. Our team will review your request and contact you shortly.',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 16, color: Colors.black54),
          ),
          actions: [
            Center(
              child: Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: TextButton(
                  onPressed: () {
                    Navigator.pop(ctx);
                    _formKey.currentState!.reset();
                    _clearControllers();
                  },
                  child: Text('Great!', 
                    style: GoogleFonts.outfit(color: AppTheme.primaryTeal, fontWeight: FontWeight.w900, fontSize: 18)
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _clearControllers() {
    _nameController.clear();
    _phoneController.clear();
    _emailController.clear();
    _eventNameController.clear();
    _eventDateController.clear();
    _locationController.clear();
    _budgetController.clear();
    _descController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0D1B1B), // Dark theme to match web and image
      body: Stack(
        children: [
          // Background Decorative Elements
          Positioned(
            top: -100,
            right: -100,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFF00A372).withOpacity(0.15),
              ),
            ).withBlur(100),
          ),
          Positioned(
            bottom: -50,
            left: -50,
            child: Container(
              width: 250,
              height: 250,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.blue.withOpacity(0.05),
              ),
            ).withBlur(80),
          ),

          SafeArea(
            child: CustomScrollView(
              physics: const BouncingScrollPhysics(),
              slivers: [
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(24, 40, 24, 32),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                          decoration: BoxDecoration(
                            color: const Color(0xFF00A372).withOpacity(0.1),
                            borderRadius: BorderRadius.circular(100),
                            border: Border.all(color: const Color(0xFF00A372).withOpacity(0.2)),
                          ),
                          child: const Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(Icons.auto_awesome, color: Color(0xFF00A372), size: 16),
                              SizedBox(width: 8),
                              Text(
                                'PREMIUM CONCIERGE',
                                style: GoogleFonts.outfit(
                                  color: AppTheme.primaryTeal,
                                  fontSize: 12,
                                  fontWeight: FontWeight.w900,
                                  letterSpacing: 2.0,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 24),
                        Text(
                          'Plan Your\nDream Event',
                          style: GoogleFonts.outfit(
                            color: Colors.white,
                            fontSize: 42,
                            fontWeight: FontWeight.w900,
                            height: 0.95,
                            letterSpacing: -1,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'Tell us your vision, and we\'ll handle the venues, vendors, and vibes.',
                          style: GoogleFonts.instrumentSans(
                            color: Colors.white70,
                            fontSize: 16,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(24, 0, 24, 100),
                  sliver: SliverToBoxAdapter(
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(32),
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                        child: Container(
                          padding: const EdgeInsets.all(32),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.05),
                            borderRadius: BorderRadius.circular(32),
                            border: Border.all(color: Colors.white.withOpacity(0.1)),
                          ),
                          child: Form(
                            key: _formKey,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                _buildSectionTitle('1', 'Personal Details'),
                                const SizedBox(height: 24),
                                _buildTextField(
                                  controller: _nameController,
                                  label: 'Full Name',
                                  hint: 'John Doe',
                                  icon: Icons.person_outline,
                                ),
                                const SizedBox(height: 20),
                                _buildTextField(
                                  controller: _emailController,
                                  label: 'Email Address',
                                  hint: 'john@example.com',
                                  icon: Icons.email_outlined,
                                  keyboardType: TextInputType.emailAddress,
                                ),
                                const SizedBox(height: 20),
                                _buildTextField(
                                  controller: _phoneController,
                                  label: 'Phone Number',
                                  hint: '+91 98765 43210',
                                  icon: Icons.phone_outlined,
                                  keyboardType: TextInputType.phone,
                                ),

                                const Padding(
                                  padding: EdgeInsets.symmetric(vertical: 40),
                                  child: Divider(color: Colors.white12),
                                ),

                                _buildSectionTitle('2', 'Event Specifics'),
                                const SizedBox(height: 24),
                                _buildDropdownField(),
                                const SizedBox(height: 20),
                                _buildTextField(
                                  controller: _eventNameController,
                                  label: 'Event Name (Optional)',
                                  hint: 'e.g. 25th Anniversary',
                                  icon: Icons.celebration_outlined,
                                ),
                                const SizedBox(height: 20),
                                Row(
                                  children: [
                                    Expanded(
                                      child: _buildTextField(
                                        controller: _eventDateController,
                                        label: 'Preferred Date',
                                        hint: 'YYYY-MM-DD',
                                        icon: Icons.calendar_today_outlined,
                                      ),
                                    ),
                                    const SizedBox(width: 16),
                                    Expanded(
                                      child: _buildTextField(
                                        controller: _locationController,
                                        label: 'City / Location',
                                        hint: 'e.g. Calicut',
                                        icon: Icons.location_on_outlined,
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 20),
                                _buildTextField(
                                  controller: _budgetController,
                                  label: 'Estimated Budget (₹)',
                                  hint: '50000',
                                  icon: Icons.currency_rupee,
                                  keyboardType: TextInputType.number,
                                ),
                                const SizedBox(height: 20),
                                _buildTextField(
                                  controller: _descController,
                                  label: 'Vision & Requirements',
                                  hint: 'Describe your dream event...',
                                  icon: Icons.notes,
                                  maxLines: 5,
                                ),

                                const SizedBox(height: 48),

                                // Premium Submit Button
                                SizedBox(
                                  width: double.infinity,
                                  height: 64,
                                  child: ElevatedButton(
                                    onPressed: _isSubmitting ? null : _submitBooking,
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: const Color(0xFF00A372),
                                      foregroundColor: Colors.white,
                                      elevation: 8,
                                      shadowColor: const Color(0xFF00A372).withOpacity(0.3),
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(20),
                                      ),
                                    ),
                                    child: _isSubmitting 
                                      ? const SizedBox(
                                          height: 24, 
                                          width: 24, 
                                          child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)
                                        )
                                      : const Row(
                                          mainAxisAlignment: MainAxisAlignment.center,
                                          children: [
                                            Text('Submit Request', 
                                              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)
                                            ),
                                            SizedBox(width: 8),
                                            Icon(Icons.arrow_forward_rounded, size: 20),
                                          ],
                                        ),
                                  ),
                                ),
                                const SizedBox(height: 16),
                                const Center(
                                  child: Text(
                                    'No payment required at this stage.',
                                    style: TextStyle(color: Colors.white38, fontSize: 13),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String number, String title) {
    return Row(
      children: [
        Container(
          width: 32,
          height: 32,
          decoration: BoxDecoration(
            color: const Color(0xFF00A372),
            borderRadius: BorderRadius.circular(10),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFF00A372).withOpacity(0.3),
                blurRadius: 8,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Center(
            child: Text(
              number,
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
          ),
        ),
        const SizedBox(width: 16),
        Text(
          title,
          style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
        ),
      ],
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required String hint,
    required IconData icon,
    TextInputType keyboardType = TextInputType.text,
    int maxLines = 1,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4, bottom: 8),
          child: Text(
            label,
            style: const TextStyle(color: Colors.white60, fontSize: 14, fontWeight: FontWeight.w500),
          ),
        ),
        TextFormField(
          controller: controller,
          keyboardType: keyboardType,
          maxLines: maxLines,
          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w300),
          decoration: InputDecoration(
            filled: true,
            fillColor: Colors.white.withOpacity(0.05),
            hintText: hint,
            hintStyle: const TextStyle(color: Colors.white24, fontWeight: FontWeight.w300),
            prefixIcon: Icon(icon, color: Colors.white38, size: 20),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: const BorderSide(color: Color(0xFF00A372), width: 1.5),
            ),
            errorStyle: const TextStyle(color: Colors.redAccent),
          ),
          validator: (val) {
            if (maxLines == 1 && (val == null || val.isEmpty) && label != 'Event Name (Optional)') {
              return 'Required';
            }
            return null;
          },
        ),
      ],
    );
  }

  Widget _buildDropdownField() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Padding(
          padding: const EdgeInsets.only(left: 4, bottom: 8),
          child: Text(
            'Event Type',
            style: TextStyle(color: Colors.white60, fontSize: 14, fontWeight: FontWeight.w500),
          ),
        ),
        DropdownButtonFormField<String>(
          value: _selectedEventType,
          dropdownColor: const Color(0xFF1A1A1A),
          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w300),
          decoration: InputDecoration(
            filled: true,
            fillColor: Colors.white.withOpacity(0.05),
            prefixIcon: const Icon(Icons.list_alt_rounded, color: Colors.white38, size: 20),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: const BorderSide(color: Color(0xFF00A372), width: 1.5),
            ),
          ),
          items: _eventTypes.map((type) {
            return DropdownMenuItem(
              value: type,
              child: Text(type),
            );
          }).toList(),
          onChanged: (val) {
            if (val != null) setState(() => _selectedEventType = val);
          },
        ),
      ],
    );
  }
}

extension on Widget {
  Widget withBlur(double sigma) => ClipRRect(
    child: BackdropFilter(
      filter: ImageFilter.blur(sigmaX: sigma, sigmaY: sigma),
      child: this,
    ),
  );
}
