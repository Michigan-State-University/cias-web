const getPause = type => {
  switch (type) {
    case 'stand_still':
      return 0;
    case 'wave':
      return 500;
    case 'bow':
      return 500;
    case 'shrug':
      return 500;
    case 'point_right':
      return 500;
    case 'point_left':
      return 500;
    case 'point_up':
      return 500;
    case 'point_down':
      return 500;

    // finished here -> animations for the future
    case 'arms_out':
      return 500;
    case 'read_book':
      return 500;
    case 'turn_book_page':
      return 500;
    case 'confused':
      return 500;
    case 'fly_away':
      return 500;
    case 'congratulate':
      return 500;
    case 'papre_airplane':
      return 500;
    case 'magic':
      return 500;
    case 'attention':
      return 500;
    case 'hop_with_arms_out_and_calculator':
      return 500;
    case 'search_around':
      return 500;
    case 'fly_in':
      return 500;
    case 'wing_to_ear':
      return 500;
    case 'turn_lightbulb_on_off':
      return 500;
    case 'hop_making_funny_sound':
      return 500;
    case 'think':
      return 500;
    case 'take_notes':
      return 500;
    default:
      return 500;
  }
};

export default getPause;
