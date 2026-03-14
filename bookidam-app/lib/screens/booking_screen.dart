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

  String _selectedEventType = 'Wedding';

  final List<String> _eventTypes = [
    'Wedding',
    'Birthday',
    'Corporate Event',
    'Tournament',
    'Cultural Programme',
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
        showDialog(
          context: context,
          builder: (ctx) => AlertDialog(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            title: const Text('Booking Received!', style: TextStyle(color: AppTheme.primaryBlue)),
            content: const Text('We have successfully received your booking request. Our team will contact you shortly to confirm the details.'),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.pop(ctx);
                  _formKey.currentState!.reset();
                  _nameController.clear();
                  _phoneController.clear();
                  _emailController.clear();
                  _eventNameController.clear();
                  _eventDateController.clear();
                  _locationController.clear();
                  _budgetController.clear();
                  _descController.clear();
                },
                child: const Text('Close', style: TextStyle(color: AppTheme.primaryBlue)),
              ),
            ],
          ),
        );
      }
    } else {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to submit booking. Please try again later.')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      appBar: AppBar(
        title: const Text('Book Your Event'),
        centerTitle: true,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Fill out the form below and let us handle all the coordination for your dream event.',
                  style: TextStyle(color: AppTheme.textLightColor, fontSize: 16),
                ),
                const SizedBox(height: 32),

                // Personal Info Section
                Text('Personal Information', style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 18)),
                const SizedBox(height: 16),
                
                TextFormField(
                  controller: _nameController,
                  decoration: const InputDecoration(labelText: 'Full Name', hintText: 'e.g. John Doe'),
                  validator: (val) => val == null || val.isEmpty ? 'Please enter your name' : null,
                ),
                const SizedBox(height: 16),
                
                Row(
                  children: [
                    Expanded(
                      flex: 1,
                      child: TextFormField(
                        controller: _phoneController,
                        keyboardType: TextInputType.phone,
                        decoration: const InputDecoration(labelText: 'Phone No.'),
                        validator: (val) => val == null || val.isEmpty ? 'Required' : null,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      flex: 2,
                      child: TextFormField(
                        controller: _emailController,
                        keyboardType: TextInputType.emailAddress,
                        decoration: const InputDecoration(labelText: 'Email Address'),
                        validator: (val) => val == null || !val.contains('@') ? 'Invalid email' : null,
                      ),
                    ),
                  ],
                ),
                
                const SizedBox(height: 32),
                
                // Event Info Section
                Text('Event Details', style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 18)),
                const SizedBox(height: 16),

                DropdownButtonFormField<String>(
                  value: _selectedEventType,
                  decoration: const InputDecoration(labelText: 'Event Type'),
                  items: _eventTypes.map((type) {
                    return DropdownMenuItem(value: type, child: Text(type));
                  }).toList(),
                  onChanged: (val) {
                    if (val != null) setState(() => _selectedEventType = val);
                  },
                ),
                const SizedBox(height: 16),

                TextFormField(
                  controller: _eventNameController,
                  decoration: const InputDecoration(labelText: 'Event Name (Optional)', hintText: 'e.g. Annual Tech Meetup'),
                ),
                const SizedBox(height: 16),

                Row(
                  children: [
                    Expanded(
                      child: TextFormField(
                        controller: _eventDateController,
                        decoration: const InputDecoration(labelText: 'Preferred Date', hintText: 'YYYY-MM-DD', suffixIcon: Icon(Icons.calendar_today, size: 18)),
                        validator: (val) => val == null || val.isEmpty ? 'Required' : null,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: TextFormField(
                        controller: _locationController,
                        decoration: const InputDecoration(labelText: 'Location / City', hintText: 'e.g. Calicut'),
                        validator: (val) => val == null || val.isEmpty ? 'Required' : null,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                TextFormField(
                  controller: _budgetController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: 'Estimated Budget / Fee', prefixIcon: Icon(Icons.currency_rupee, size: 18)),
                  validator: (val) => val == null || val.isEmpty ? 'Required' : null,
                ),
                const SizedBox(height: 16),

                TextFormField(
                  controller: _descController,
                  maxLines: 4,
                  decoration: const InputDecoration(labelText: 'Description / Requirements', hintText: 'Tell us more about what you need...'),
                ),
                
                const SizedBox(height: 32),

                // Submit Button
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _isSubmitting ? null : _submitBooking,
                    child: _isSubmitting 
                      ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                      : const Text('Request Booking'),
                  ),
                ),
                const SizedBox(height: 40),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
