import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

  export const UserSpec = UserCredentialsSpec.keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
  }).label("UserDetails");

  export const UserSpecPlus = UserSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
  }).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const ReviewSpec = Joi.object()
  .keys({
    reviewer: Joi.string().required().example("Mike Robbins"),
    review: Joi.string().required().example("The Gearagh is located in Macroom, County Cork. It was formed at the end of the last Ice Age and consists of a vast area of submerged islands that once supported a rich woodland flora. The Gearagh gets its name from \"An Gaoire\", the wooden river. It is the remains of the only ancient post glacial alluvial forest in Western Europe. In 1987 the area was declared a statutory nature reserve. The islands, for the most part, are covered by the waters of the Lee Hydro-electrical scheme. However, during dry periods numerous rare species of plants can be encountered e.g. mud worth, which is only found in one other location outside the Gearagh.  This area is also of interest to bird watchers with both summer and winter migrants. From October onwards migratory birds arrive in large flocks. The Gearagh is a haven of peace and tranquillity and provides ideal opportunities for off road walking. It is located in Macroom, County Cork."),
    rating: Joi.number().allow("").optional(-8.9841),
    poiid: IdSpec,
  })
.label("Review");

export const ReviewSpecPlus = ReviewSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ReviewPlus");

export const ReviewArraySpec = Joi.array().items(ReviewSpecPlus).label("ReviewArray");

export const PoiSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Ards Forest Park"),
    description: Joi.string().required().example("Florence Court Forest Park is on Cuilcagh Mountain and covers 1,200 hectares. This old estate forest and moorland adjoin the National Trust's Florence Court House and property. The park offers widely contrasting habitats, from open mountain and blanket bog to coniferous forest. The old estate woodland features many mature oaks, some planted around 200 years ago.  A few miles away the separate coniferous forest block of Doohatty lies at the foot of Benaughlin Mountain."),
    longitude: Joi.number().allow("").optional(1),
    latitude: Joi.number().allow("").optional(2),
    userid: IdSpec,
    reviews: ReviewArraySpec,
  })
  .label("Poi");

  export const PoiSpecPlus = PoiSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
  }).label("Poi");

  export const PublicPoiSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Barna Woods"),
    description: Joi.string().required().example("The Gearagh is located in Macroom, County Cork. It was formed at the end of the last Ice Age and consists of a vast area of submerged islands that once supported a rich woodland flora. The Gearagh gets its name from \"An Gaoire\", the wooden river. It is the remains of the only ancient post glacial alluvial forest in Western Europe. In 1987 the area was declared a statutory nature reserve. The islands, for the most part, are covered by the waters of the Lee Hydro-electrical scheme. However, during dry periods numerous rare species of plants can be encountered e.g. mud worth, which is only found in one other location outside the Gearagh.  This area is also of interest to bird watchers with both summer and winter migrants. From October onwards migratory birds arrive in large flocks. The Gearagh is a haven of peace and tranquillity and provides ideal opportunities for off road walking. It is located in Macroom, County Cork."),
    longitude: Joi.number().allow("").optional(1),
    latitude: Joi.number().allow("").optional(2),
    userid: IdSpec,
    reviews: ReviewArraySpec,
  })
  .label("Poi");

  export const PublicPoiSpecPlus = PoiSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
  }).label("Poi");
  
  export const PoiArraySpec = Joi.array().items(PoiSpecPlus).label("PoiArray");

  export const PublicPoiArraySpec = Joi.array().items(PublicPoiSpecPlus).label("PublicPoiArray");