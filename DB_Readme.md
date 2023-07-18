## Query to delete all new rows after the 13th

```sql
DELETE FROM `Billboard` WHERE createdAt > '2023-07-14';
DELETE FROM `Category` WHERE createdAt > '2023-07-14';
DELETE FROM `Color` WHERE createdAt > '2023-07-14';
DELETE FROM `Order` WHERE createdAt > '2023-07-14';
DELETE FROM `Product` WHERE createdAt > '2023-07-14';
DELETE FROM `Size` WHERE createdAt > '2023-07-14';
DELETE FROM `Store` WHERE createdAt > '2023-07-14';
```
