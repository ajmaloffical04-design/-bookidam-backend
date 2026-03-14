import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Colors
  static const Color primaryBlue = Color(0xFF0091FF);
  static const Color secondaryWhite = Color(0xFFFFFFFF);
  static const Color accentLightBlue = Color(0xFFE5F4FF);
  static const Color backgroundColor = Color(0xFFF8FAF9);
  static const Color textColor = Color(0xFF09090B);
  static const Color textLightColor = Color(0xFF71717A);

  static ThemeData get lightTheme {
    return ThemeData(
      primaryColor: primaryBlue,
      scaffoldBackgroundColor: backgroundColor,
      colorScheme: ColorScheme.light(
        primary: primaryBlue,
        secondary: accentLightBlue,
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
        iconTheme: const IconThemeData(color: primaryBlue),
        titleTextStyle: GoogleFonts.inter(
          color: primaryBlue,
          fontSize: 22,
          fontWeight: FontWeight.w700,
          letterSpacing: -0.5,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryBlue,
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
          borderSide: const BorderSide(color: Color(0xFFE4E4E7)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: primaryBlue, width: 2),
        ),
        hintStyle: GoogleFonts.inter(color: textLightColor),
      ),
    );
  }
}
