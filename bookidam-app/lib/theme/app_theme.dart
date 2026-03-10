import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Colors
  static const Color primaryGreen = Color(0xFF1E8449);
  static const Color secondaryWhite = Color(0xFFFFFFFF);
  static const Color accentLightGreen = Color(0xFFE8F6F3);
  static const Color backgroundColor = Color(0xFFF8F9FA);
  static const Color textColor = Color(0xFF2C3E50);
  static const Color textLightColor = Color(0xFF7F8C8D);

  static ThemeData get lightTheme {
    return ThemeData(
      primaryColor: primaryGreen,
      scaffoldBackgroundColor: backgroundColor,
      colorScheme: ColorScheme.light(
        primary: primaryGreen,
        secondary: accentLightGreen,
        surface: secondaryWhite,
      ),
      // Using Google Fonts closely mirroring SF Pro
      textTheme: GoogleFonts.interTextTheme().copyWith(
        displayLarge: GoogleFonts.inter(
          color: textColor,
          fontWeight: FontWeight.bold,
        ),
        bodyLarge: GoogleFonts.inter(color: textColor),
        bodyMedium: GoogleFonts.inter(color: textColor),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: secondaryWhite,
        elevation: 0,
        centerTitle: false,
        iconTheme: const IconThemeData(color: primaryGreen),
        titleTextStyle: GoogleFonts.inter(
          color: primaryGreen,
          fontSize: 22,
          fontWeight: FontWeight.w700,
          letterSpacing: -0.5,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryGreen,
          foregroundColor: secondaryWhite,
          elevation: 2,
          padding: const EdgeInsets.symmetric(vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: secondaryWhite,
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFFEEEEEE)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: primaryGreen, width: 2),
        ),
        hintStyle: GoogleFonts.inter(color: textLightColor),
      ),
    );
  }
}
