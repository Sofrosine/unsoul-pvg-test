type Image = {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  urls: ImageUrl;
  links: ImageLink;
  user: ImageUser;
};

type ImageUrl = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
};

type ImageLink = {
  self: string;
  html: string;
  download: string;
  download_location: string;
};

type ImageUser = {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
};
