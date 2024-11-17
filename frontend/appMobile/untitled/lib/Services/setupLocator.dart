import 'package:get_it/get_it.dart';
import 'package:untitled/Services/TripOffers.service.dart';
import 'package:untitled/Services/user.service.dart';

final GetIt getIt = GetIt.instance;

void setupLocator() {
  getIt.registerLazySingleton<user>(() => user());
  getIt.registerLazySingleton<TripOffers>(() => TripOffers());

}
