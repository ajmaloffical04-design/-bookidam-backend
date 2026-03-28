import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Colors (Liquid Glass Premium Branding)
  static const Color primaryBlue = Color(0xFF0091FF);
  static const Color primaryTeal = Color(0xFF00A372);
  static const Color secondaryWhite = Color(0xFFFFFFFF);
  static const Color accentLightBlue = Color(0xFFE5F4FF);
  static const Color backgroundColor = Color(0xFFF8FAF9);
  static const Color darkBackground = Color(0xFF0D1B1B);
  static const Color textColor = Color(0xFF09090B);
  static const Color textLightColor = Color(0xFF71717A);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      primaryColor: primaryBlue,
      scaffoldBackgroundColor: backgroundColor,
      colorScheme: ColorScheme.light(
        primary: primaryBlue,
        secondary: primaryTeal,
        surface: secondaryWhite,
      ),
      textTheme: TextTheme(
        displayLarge: GoogleFonts.outfit(
          color: textColor,
          fontWeight: FontWeight.w900,
          letterSpacing: -1.0,
        ),
        displayMedium: GoogleFonts.outfit(
          color: textColor,
          fontWeight: FontWeight.w800,
          letterSpacing: -0.5,
        ),
        headlineMedium: GoogleFonts.outfit(
          color: textColor,
          fontWeight: FontWeight.w700,
        ),
        bodyLarge: GoogleFonts.instrumentSans(
          color: textColor,
          fontWeight: FontWeight.w500,
        ),
        bodyMedium: GoogleFonts.instrumentSans(
          color: textColor,
        ),
        labelLarge: GoogleFonts.outfit(
          color: primaryBlue,
          fontWeight: FontWeight.bold,
          letterSpacing: 1.2,
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        iconTheme: const IconThemeData(color: textColor),
        titleTextStyle: GoogleFonts.outfit(
          color: textColor,
          fontSize: 24,
          fontWeight: FontWeight.w900,
          letterSpacing: -0.5,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryBlue,
          foregroundColor: secondaryWhite,
          elevation: 0,
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 24),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          textStyle: GoogleFonts.outfit(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            letterSpacing: 0.5,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: Colors.black.withOpacity(0.05)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: Colors.black.withOpacity(0.05)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: primaryBlue, width: 2),
        ),
        hintStyle: GoogleFonts.instrumentSans(color: textLightColor),
      ),
    );
  }
}
