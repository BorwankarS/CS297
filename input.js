for ( int j=0; j<array.size(); j++) {
  if ( (double)array.get(j) > threshold ) {
    higher++;
  } else {
    lower++;
  }
}
