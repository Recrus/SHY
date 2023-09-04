<p align="center"><a href="https://laravel.com" target="_blank"><img src="./frontend/src/media/logo-nobg.svg" width="200" alt="Laravel Logo"></a></p>

## About project

SHY is an application designed to streamline the job search for junior developers. Not only can you find the latest job postings tailored for junior roles,
but you can also validate your skills through our built-in tests and exams. Prove your worth and get access to exclusive job opportunities!

> ⚠️ The project is currently in the development stage.

## Table of Contents

-   [About Project](#about-project)
-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Usage](#usage)
-   [Contact](#contact)

### Features

-   Job Search: Search from a vast database of jobs suitable for junior developers.
-   Skill Tests: Take skill tests in various domains to validate your skills.
-   Exclusive Access: Score well in exams and unlock exclusive job listings.
-   Company Reviews: Read reviews of companies to make an informed decision.

### Tech Stack

-   PHP/Laravel
-   React
-   Redux
-   TypeScript
-   Vite
-   Tailwind

### Getting started

**Prerequisites**

-   Node.js v16.x.x or above
-   npm v9.x.x or above
-   PHP version 8.2
-   Laravel v10.12

### Installation

1. Clone the repository

```shell
git clone https://github.com/Recrus/SHY.git
```

2. Navigate to the project directory

```shell
cd SHY
```

3. Create valet link

```shell
valet link
```

4. Create your db

5. Run migrations and seed

```shell
php artisan migrate:fresh --seed
```

6. Install NPM packages for frontend

```shell
cd frontend/
yarn install
```

7. Start the development server

```shell
yarn dev
```

### Usage

1. Look up to your users table in db and pick email to log in into super-admin (id 1) or employee (id 7).
2. Browse users, test, exams
3. Wait until new features comes

### Contact

-   Developer: Recrus
-   Email: dan.plishkin@gmail.com
