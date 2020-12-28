#!/bin/bash

cd backend/src
node server.js &
cd .. 
cd ..
cd frontend
npm start
