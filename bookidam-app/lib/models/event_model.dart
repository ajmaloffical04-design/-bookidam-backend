class EventModel {
  final int id;
  final String title;
  final String type;
  final String date;
  final String location;
  final String description;
  final String? imageUrl;
  final int? singleDayPrice;

  EventModel({
    required this.id,
    required this.title,
    required this.type,
    required this.date,
    required this.location,
    required this.description,
    this.imageUrl,
    this.singleDayPrice,
  });

  factory EventModel.fromJson(Map<String, dynamic> json) {
    return EventModel(
      id: json['id'],
      title: json['title'],
      type: json['type'],
      date: json['date'],
      location: json['location'],
      description: json['description'],
      imageUrl: json['imageUrl'] ?? json['image_url'],
      singleDayPrice: json['singleDayPrice'] ?? json['single_day_price'],
    );
  }
}
