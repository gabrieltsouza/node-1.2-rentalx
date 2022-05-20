# Car registration

**RF** 
Should be able register a new car
Should be able to list all categories

**RN** 
Should not be able register a car with an existent license plate 
Should not be able modify a car license plate 
Should register a default availability when a new car 
Should be an administrator to be able to register a new car 

# Car list

**RF** 
Should be able to list all cars available
Should be able to list all cars available by name
Should be able to list all cars available by brand name
Should be able to list all cars available by category name
Should be able to list all cars available by specification name

**RN** 
Should not be necessary to be authenticated in order to list cars

# Car specification

**RF**
Should be able register a new car specification
Should be able to list all specifications
Should be able to list all cars

**RN** 
Should not be able register a car specification without a car 
Should not be able register a car specification duplicated for the same car
Should be an administrator to register a new specification

# Car Images

**RF**
Should be able to register the car image 
Should be able to list all cars

**RNF**
Should be able use multer library to upload images

**RN**
Should be able to register more than one image per car
Should be an administrator to upload car images  

# Car rental

**RF**
Should be able to register a car rental


**RN**
Should be able to register a car rental with 24 hours duration at least
Should not be able to register a car rental for a customer who already has an active car rental
Should not be able to register a car rental for a car who already has an active car rental
