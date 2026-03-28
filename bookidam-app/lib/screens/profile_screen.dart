import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:bookidam/theme/app_theme.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0D1B1B), // Dark theme matching the branding
      body: Stack(
        children: [
          // Background Decorative Gradients
          Positioned(
            top: -100,
            left: -100,
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
            bottom: 100,
            right: -50,
            child: Container(
              width: 200,
              height: 200,
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
                // Profile Header
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(24, 40, 24, 32),
                    child: Column(
                      children: [
                        // Avatar with Glow
                        Stack(
                          alignment: Alignment.center,
                          children: [
                            Container(
                              width: 140,
                              height: 140,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                gradient: LinearGradient(
                                  colors: [
                                    const Color(0xFF00A372).withOpacity(0.5),
                                    Colors.blue.withOpacity(0.3),
                                  ],
                                ),
                              ),
                            ).withBlur(20),
                            Container(
                              padding: const EdgeInsets.all(4),
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                border: Border.all(color: Colors.white24),
                              ),
                              child: const CircleAvatar(
                                radius: 60,
                                backgroundColor: Color(0xFF1A1A1A),
                                backgroundImage: NetworkImage('https://api.dicebear.com/7.x/avataaars/svg?seed=John'),
                              ),
                            ),
                            Positioned(
                              bottom: 0,
                              right: 5,
                              child: Container(
                                padding: const EdgeInsets.all(8),
                                decoration: const BoxDecoration(
                                  color: Color(0xFF00A372),
                                  shape: BoxShape.circle,
                                  boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 10, offset: Offset(0, 4))],
                                ),
                                child: const Icon(Icons.verified_user, color: Colors.white, size: 20),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 24),
                        Text(
                          'John Doe',
                          style: GoogleFonts.outfit(
                            color: Colors.white,
                            fontSize: 36,
                            fontWeight: FontWeight.w900,
                            letterSpacing: -1.0,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                          decoration: BoxDecoration(
                            color: const Color(0xFF00A372).withOpacity(0.1),
                            borderRadius: BorderRadius.circular(100),
                            border: Border.all(color: const Color(0xFF00A372).withOpacity(0.2)),
                          ),
                          child: Text(
                            'PREMIUM MEMBER',
                            style: GoogleFonts.outfit(
                              color: AppTheme.primaryTeal,
                              fontSize: 10,
                              fontWeight: FontWeight.w900,
                              letterSpacing: 2.0,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                // Stats Row
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: Row(
                      children: [
                        _buildStatCard('08', 'Events'),
                        const SizedBox(width: 16),
                        _buildStatCard('12.4k', 'Savings'),
                        const SizedBox(width: 16),
                        _buildStatCard('4.9', 'Rating'),
                      ],
                    ),
                  ),
                ),

                // Settings & Actions
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(24, 32, 24, 100),
                  sliver: SliverToBoxAdapter(
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(32),
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                        child: Container(
                          padding: const EdgeInsets.all(24),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.05),
                            borderRadius: BorderRadius.circular(32),
                            border: Border.all(color: Colors.white.withOpacity(0.1)),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                               Text(
                                'Account Settings',
                                style: GoogleFonts.outfit(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w900),
                              ),
                              const SizedBox(height: 16),
                              _buildSettingItem(Icons.person_outline, 'Personal Information', Colors.blue),
                              _buildSettingItem(Icons.history_rounded, 'Booking History', Colors.orange),
                              _buildSettingItem(Icons.payment_rounded, 'Payment Methods', Colors.green),
                              _buildSettingItem(Icons.notifications_none_rounded, 'Notifications', Colors.purple),
                              _buildSettingItem(Icons.security_rounded, 'Security & Privacy', Colors.teal),
                              
                              const Padding(
                                padding: EdgeInsets.symmetric(vertical: 24),
                                child: Divider(color: Colors.white10),
                              ),

                              // Logout Button
                              SizedBox(
                                width: double.infinity,
                                height: 60,
                                child: TextButton.icon(
                                  onPressed: () {
                                    // Logout logic
                                  },
                                  style: TextButton.styleFrom(
                                    backgroundColor: Colors.redAccent.withOpacity(0.1),
                                    foregroundColor: Colors.redAccent,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                  ),
                                  icon: const Icon(Icons.logout_rounded),
                                  label: Text('Sign Out', style: GoogleFonts.outfit(fontWeight: FontWeight.bold, fontSize: 16)),
                                ),
                              ),
                            ],
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

  Widget _buildStatCard(String value, String label) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 20),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.03),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: Colors.white.withOpacity(0.05)),
        ),
        child: Column(
          children: [
            Text(value, style: GoogleFonts.outfit(color: Colors.white, fontSize: 28, fontWeight: FontWeight.w900, letterSpacing: -1)),
            const SizedBox(height: 4),
            Text(label, style: GoogleFonts.instrumentSans(color: Colors.white38, fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1)),
          ],
        ),
      ),
    );
  }

  Widget _buildSettingItem(IconData icon, String label, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: InkWell(
        onTap: () {},
        borderRadius: BorderRadius.circular(16),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            color: Colors.transparent,
          ),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(icon, color: color, size: 22),
              ),
              const SizedBox(width: 20),
              Expanded(
                child: Text(
                  label,
                  style: GoogleFonts.instrumentSans(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w500),
                ),
              ),
              const Icon(Icons.chevron_right_rounded, color: Colors.white24),
            ],
          ),
        ),
      ),
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
