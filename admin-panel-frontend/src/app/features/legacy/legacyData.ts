export const legacyData = {
  "user-management": {
    "source": "html/user&access management/usermanagement.html",
    "tables": [],
    "datasets": {
      "statsData": [
        {
          "id": "totalUsers",
          "icon": "totalUsers",
          "title": "Total Users",
          "value": "8,432",
          "trend": null
        },
        {
          "id": "activeUsers",
          "icon": "activeUsers",
          "title": "Active Users (24h)",
          "value": "3,247",
          "trend": {
            "value": "+8.1%",
            "type": "positive"
          }
        },
        {
          "id": "instructors",
          "icon": "instructors",
          "title": "Instructors",
          "value": "1,248",
          "trend": {
            "value": "+15.2%",
            "type": "positive"
          }
        },
        {
          "id": "students",
          "icon": "students",
          "title": "Students",
          "value": "6,954",
          "trend": {
            "value": "+9.7%",
            "type": "positive"
          }
        },
        {
          "id": "suspended",
          "icon": "suspendedUsers",
          "title": "Suspended Users",
          "value": "127",
          "trend": {
            "value": "-2.3%",
            "type": "negative"
          }
        },
        {
          "id": "pending",
          "icon": "pendingVerification",
          "title": "Pending Verification",
          "value": "432",
          "trend": {
            "value": "-0.8%",
            "type": "neutral"
          }
        },
        {
          "id": "newUsers",
          "icon": "newUsers",
          "title": "New Users (7d)",
          "value": "394",
          "trend": {
            "value": "+18.4%",
            "type": "positive"
          }
        },
        {
          "id": "inactive",
          "icon": "inactiveUsers",
          "title": "Inactive Users (30d+)",
          "value": "1,623",
          "trend": {
            "value": "-5.2%",
            "type": "negative"
          }
        }
      ],
      "usersData": [
        {
          "id": 1,
          "name": "Sarah Johnson",
          "internalId": "USR-8FJ39K2L",
          "lwId": "LW-4829037",
          "email": "sarah.johnson@example.com",
          "role": "instructor",
          "status": "active",
          "joined": "Jan 15, 2025",
          "joinedFull": "January 15, 2025 4:37:33 PM",
          "lastLogin": "February 22, 2025 10:15:32 AM",
          "ip": "85.124.33.98",
          "lastIp": "85.124.35.102",
          "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png",
          "tags": [
            "Premium",
            "Verified",
            "Beta Tester",
            "Course Creator"
          ],
          "viewLinks": [
            "accountDetails",
            "preferences",
            "billing",
            "loginHistory",
            "activityStats",
            "posts",
            "subscriptions",
            "enrollments",
            "certificates"
          ],
          "linkedTo": [
            "enrollments",
            "transactions",
            "reviews",
            "subscriptions",
            "spaces",
            "certificates",
            "apiLog"
          ]
        },
        {
          "id": 2,
          "name": "Michael Chen",
          "internalId": "USR-9XM45RN7",
          "lwId": "LW-5932184",
          "email": "michael.chen@example.com",
          "role": "student",
          "status": "active",
          "joined": "Jan 28, 2025",
          "joinedFull": "January 28, 2025 9:12:45 AM",
          "lastLogin": "February 25, 2025 3:22:18 PM",
          "ip": "192.168.45.72",
          "lastIp": "192.168.45.78",
          "avatar": "https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png",
          "tags": [
            "Beginner",
            "Mobile"
          ],
          "viewLinks": [
            "accountDetails",
            "preferences",
            "billing",
            "loginHistory",
            "activityStats",
            "posts",
            "subscriptions",
            "enrollments",
            "certificates"
          ],
          "linkedTo": [
            "enrollments",
            "transactions",
            "reviews",
            "posts",
            "spaces",
            "certificates",
            "apiLog"
          ]
        },
        {
          "id": 3,
          "name": "Emily Rodriguez",
          "internalId": "USR-7JK2L3P9",
          "lwId": "LW-6847293",
          "email": "emily.rodriguez@example.com",
          "role": "support",
          "status": "pending",
          "joined": "Feb 10, 2025",
          "joinedFull": "February 10, 2025 2:45:30 PM",
          "lastLogin": "February 25, 2025 9:18:47 AM",
          "ip": "45.89.127.55",
          "lastIp": "45.89.127.60",
          "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg",
          "tags": [
            "Support",
            "UK",
            "Remote Worker"
          ],
          "viewLinks": [
            "accountDetails",
            "preferences",
            "billing",
            "loginHistory",
            "activityStats",
            "posts",
            "subscriptions",
            "enrollments",
            "certificates"
          ],
          "linkedTo": [
            "enrollments",
            "transactions",
            "certificates",
            "apiLog",
            "spaces",
            "reviews",
            "posts"
          ]
        },
        {
          "id": 4,
          "name": "David Wilson",
          "internalId": "USR-4MN8Q5R2",
          "lwId": "LW-7435629",
          "email": "david.wilson@example.com",
          "role": "admin",
          "status": "suspended",
          "joined": "Dec 03, 2024",
          "joinedFull": "December 03, 2024 11:23:45 AM",
          "lastLogin": "February 26, 2025 8:45:12 AM",
          "ip": "203.45.128.91",
          "lastIp": "203.45.128.95",
          "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png",
          "tags": [
            "Admin",
            "Senior",
            "Full Permissions",
            "System Manager",
            "Technical Lead"
          ],
          "viewLinks": [
            "accountDetails",
            "preferences",
            "billing",
            "loginHistory",
            "activityStats",
            "posts",
            "subscriptions",
            "enrollments",
            "certificates"
          ],
          "linkedTo": [
            "enrollments",
            "transactions",
            "apiLog",
            "spaces",
            "certificates",
            "reviews",
            "posts"
          ]
        },
        {
          "id": 5,
          "name": "Lisa Thompson",
          "internalId": "USR-3TY9P6Q8",
          "lwId": "LW-8947251",
          "email": "lisa.thompson@example.com",
          "role": "student",
          "status": "inactive",
          "joined": "Feb 20, 2025",
          "joinedFull": "February 20, 2025 7:32:18 PM",
          "lastLogin": "February 25, 2025 11:30:45 AM",
          "ip": "98.236.147.22",
          "lastIp": "98.236.147.28",
          "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg",
          "tags": [
            "Trial"
          ],
          "viewLinks": [
            "accountDetails",
            "preferences",
            "billing",
            "loginHistory",
            "activityStats",
            "posts",
            "subscriptions",
            "enrollments",
            "certificates"
          ],
          "linkedTo": [
            "enrollments",
            "transactions",
            "reviews",
            "spaces",
            "certificates",
            "apiLog",
            "posts"
          ]
        }
      ]
    }
  },
  "all-instructors": {
    "source": "html/user&access management/instructor management/all instrutors.html",
    "tables": [],
    "datasets": {
      "statsData": [
        {
          "id": "instructors",
          "icon": "instructors",
          "title": "Approved Instructors",
          "value": "248",
          "trend": {
            "value": "+5.2%",
            "type": "positive"
          }
        },
        {
          "id": "products",
          "icon": "activeProducts",
          "title": "Active Products",
          "value": "1,892",
          "trend": {
            "value": "+12.4%",
            "type": "positive"
          }
        },
        {
          "id": "revenue",
          "icon": "revenue",
          "title": "Total Revenue",
          "value": "$4.2M",
          "trend": {
            "value": "+8.5%",
            "type": "positive"
          }
        },
        {
          "id": "pending",
          "icon": "pendingVerification",
          "title": "Pending Payouts",
          "value": "$12,450",
          "trend": {
            "value": "Due 15th",
            "type": "neutral"
          }
        }
      ],
      "instructorsData": [
        {
          "id": 1,
          "name": "Dr. Sarah Jenkins",
          "email": "sarah.j@uni.edu",
          "internalId": "USR-8FJ3K2L",
          "lwId": "LW-4829037",
          "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png",
          "approvedDate": "Jan 12, 2024",
          "products": {
            "total": 14,
            "courses": 12,
            "events": 2,
            "bundles": 0
          },
          "totalSales": "$45,230",
          "payoutStatus": "eligible",
          "lastPayout": {
            "amount": "$1,200.00",
            "date": "Feb 28, 2025"
          },
          "pending": "$450.00"
        },
        {
          "id": 2,
          "name": "Markus DeVine",
          "email": "markus.dev@tech.io",
          "internalId": "USR-9X2MK7P",
          "lwId": "LW-1102845",
          "avatar": "https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png",
          "approvedDate": "Mar 04, 2024",
          "products": {
            "total": 3,
            "courses": 3,
            "events": 0,
            "bundles": 0
          },
          "totalSales": "$850.00",
          "payoutStatus": "setup",
          "lastPayout": {
            "amount": "—",
            "date": "Never"
          },
          "pending": "$850.00"
        },
        {
          "id": 3,
          "name": "Elena Rodriguez",
          "email": "elena.r@design.co",
          "internalId": "USR-3K9PL4Q",
          "lwId": "LW-7741293",
          "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg",
          "approvedDate": "Nov 20, 2023",
          "products": {
            "total": 21,
            "courses": 15,
            "events": 4,
            "bundles": 2
          },
          "totalSales": "$112,400",
          "payoutStatus": "processing",
          "lastPayout": {
            "amount": "$5,420.50",
            "date": "Processing..."
          },
          "pending": "$2,100.00"
        },
        {
          "id": 4,
          "name": "James Carter",
          "email": "j.carter@edu.net",
          "internalId": "USR-4J8LR2N",
          "lwId": "LW-9921847",
          "avatar": "https://i.pravatar.cc/150?u=4",
          "approvedDate": "Feb 01, 2024",
          "products": {
            "total": 5,
            "courses": 5,
            "events": 0,
            "bundles": 0
          },
          "totalSales": "$12,400",
          "payoutStatus": "hold",
          "lastPayout": {
            "amount": "$3,200.00",
            "date": "Jan 15, 2025"
          },
          "pending": "$4,500.00"
        },
        {
          "id": 5,
          "name": "Alex Morgan",
          "email": "alex.m@susp.com",
          "internalId": "USR-XXXXX",
          "lwId": "LW-XXXXX",
          "avatar": "https://i.pravatar.cc/150?u=5",
          "approvedDate": "Aug 15, 2023",
          "products": {
            "total": 0,
            "courses": 0,
            "events": 0,
            "bundles": 0
          },
          "totalSales": "$0.00",
          "payoutStatus": "suspended",
          "lastPayout": {
            "amount": "—",
            "date": "—"
          },
          "pending": "—"
        }
      ]
    }
  },
  "applications": {
    "source": "html/user&access management/instructor management/applications.html",
    "tables": [],
    "datasets": {
      "statsData": [
        {
          "id": "pendingReview",
          "icon": "pendingReview",
          "title": "Pending Review",
          "value": "12",
          "trend": null
        },
        {
          "id": "approved",
          "icon": "approved",
          "title": "Approved (30d)",
          "value": "45",
          "trend": {
            "value": "+12%",
            "type": "positive"
          }
        },
        {
          "id": "rejected",
          "icon": "rejected",
          "title": "Rejected (30d)",
          "value": "8",
          "trend": {
            "value": "-2%",
            "type": "negative"
          }
        },
        {
          "id": "avgTime",
          "icon": "avgTime",
          "title": "Avg. Review Time",
          "value": "1.4 Days",
          "trend": {
            "value": "Fast",
            "type": "positive"
          }
        }
      ],
      "applicationsData": [
        {
          "id": 1,
          "appId": "APP-2938",
          "name": "Jason Miller",
          "email": "jason.m@dev.com",
          "avatar": "https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png",
          "applied": "Today",
          "appliedFull": "December 13, 2025",
          "category": "Development",
          "experience": "5 Years",
          "status": "pending",
          "reviewer": null,
          "phone": "+1 (555) 123-4567",
          "ip": "192.168.1.105",
          "teachingLanguage": "English",
          "motivation": "I have been passionate about software development for over 5 years and have extensive experience teaching coding bootcamps. I believe in hands-on learning and want to share my knowledge with aspiring developers. My approach focuses on practical projects and real-world applications.",
          "videoUrl": "https://www.youtube.com/watch?v=example123",
          "socialMedia": [
            {
              "platform": "LinkedIn",
              "url": "https://linkedin.com/in/jasonmiller"
            },
            {
              "platform": "Twitter",
              "url": "https://twitter.com/jasonmdev"
            },
            {
              "platform": "GitHub",
              "url": "https://github.com/jasonmiller"
            }
          ],
          "portfolioUrl": "https://jasonmiller.dev",
          "rejectionReason": null,
          "notes": []
        },
        {
          "id": 2,
          "appId": "APP-2910",
          "name": "Alicia Keys",
          "email": "alicia@music.io",
          "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg",
          "applied": "Feb 20, 2025",
          "appliedFull": "February 20, 2025",
          "category": "Music",
          "experience": "10+ Years",
          "status": "info",
          "reviewer": {
            "name": "Admin Dave",
            "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png"
          },
          "phone": "+1 (555) 987-6543",
          "ip": "45.67.89.123",
          "teachingLanguage": "English, Spanish",
          "motivation": "As a professional musician with over a decade of experience, I want to help others discover the joy of music. I have taught private lessons and group classes, and I believe online learning can reach students who otherwise would not have access to quality music education.",
          "videoUrl": "https://vimeo.com/example456",
          "socialMedia": [
            {
              "platform": "Instagram",
              "url": "https://instagram.com/aliciamusic"
            },
            {
              "platform": "YouTube",
              "url": "https://youtube.com/aliciakeys"
            }
          ],
          "portfolioUrl": "https://aliciamusic.com",
          "rejectionReason": null,
          "notes": [
            {
              "id": 1,
              "author": "Admin Dave",
              "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png",
              "content": "Need to verify her credentials. Waiting for certificate copies.",
              "timestamp": "2 days ago"
            },
            {
              "id": 2,
              "author": "Sarah Admin",
              "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg",
              "content": "I reached out via email. She said she will send them by Friday.",
              "timestamp": "1 day ago"
            }
          ]
        },
        {
          "id": 3,
          "appId": "APP-2899",
          "name": "Robert Fox",
          "email": "bob.fox@mail.com",
          "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png",
          "applied": "Feb 18, 2025",
          "appliedFull": "February 18, 2025",
          "category": "Marketing",
          "experience": "1 Year",
          "status": "rejected",
          "reviewer": {
            "name": "Admin Dave",
            "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png"
          },
          "phone": "+1 (555) 456-7890",
          "ip": "78.90.12.34",
          "teachingLanguage": "English",
          "motivation": "I want to teach digital marketing strategies to small business owners.",
          "videoUrl": null,
          "socialMedia": [
            {
              "platform": "LinkedIn",
              "url": "https://linkedin.com/in/robertfox"
            }
          ],
          "portfolioUrl": null,
          "rejectionReason": "Insufficient teaching experience. We require a minimum of 3 years of professional experience in the subject area. Please feel free to reapply once you have gained more experience.",
          "notes": [
            {
              "id": 1,
              "author": "Admin Dave",
              "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png",
              "content": "Application lacks substance. Only 1 year experience is not enough.",
              "timestamp": "5 days ago",
              "replies": []
            }
          ]
        },
        {
          "id": 4,
          "appId": "APP-2875",
          "name": "Emily Chen",
          "email": "emily.chen@design.co",
          "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg",
          "applied": "Feb 15, 2025",
          "appliedFull": "February 15, 2025",
          "category": "Design",
          "experience": "8 Years",
          "status": "approved",
          "reviewer": {
            "name": "Sarah Admin",
            "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg"
          },
          "phone": "+1 (555) 234-5678",
          "ip": "123.45.67.89",
          "teachingLanguage": "English, Mandarin",
          "motivation": "Design is my passion and I have been working as a UX designer for Fortune 500 companies. I want to share my knowledge and help others break into the design industry.",
          "videoUrl": "https://www.youtube.com/watch?v=design789",
          "socialMedia": [
            {
              "platform": "Dribbble",
              "url": "https://dribbble.com/emilychen"
            },
            {
              "platform": "Behance",
              "url": "https://behance.net/emilychen"
            },
            {
              "platform": "LinkedIn",
              "url": "https://linkedin.com/in/emilychen"
            }
          ],
          "portfolioUrl": "https://emilychen.design",
          "rejectionReason": null,
          "notes": [
            {
              "id": 1,
              "author": "Sarah Admin",
              "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg",
              "content": "Excellent portfolio and credentials. Approved!",
              "timestamp": "10 days ago",
              "replies": []
            }
          ]
        },
        {
          "id": 5,
          "appId": "APP-2860",
          "name": "Marcus Johnson",
          "email": "marcus.j@fitness.io",
          "avatar": "https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png",
          "applied": "Feb 12, 2025",
          "appliedFull": "February 12, 2025",
          "category": "Fitness",
          "experience": "6 Years",
          "status": "pending",
          "reviewer": {
            "name": "Admin Dave",
            "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png"
          },
          "phone": "+1 (555) 345-6789",
          "ip": "98.76.54.32",
          "teachingLanguage": "English",
          "motivation": "As a certified personal trainer and nutrition coach, I have helped hundreds of clients achieve their fitness goals. I want to expand my reach and help even more people live healthier lives through online courses.",
          "videoUrl": "https://www.youtube.com/watch?v=fitness101",
          "socialMedia": [
            {
              "platform": "Instagram",
              "url": "https://instagram.com/marcusfitness"
            },
            {
              "platform": "YouTube",
              "url": "https://youtube.com/marcusjohnson"
            }
          ],
          "portfolioUrl": "https://marcusfitness.com",
          "rejectionReason": null,
          "notes": [
            {
              "id": 1,
              "author": "Admin Dave",
              "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png",
              "content": "Checking his certifications. NASM and ACE certified - looks good so far.",
              "timestamp": "3 days ago",
              "replies": []
            }
          ]
        }
      ]
    }
  },
  "team-contacts": {
    "source": "html/user&access management/teams/team contacts.html",
    "tables": [],
    "datasets": {
      "statsData": [
        {
          "id": "activeContracts",
          "icon": "activeContracts",
          "title": "Active Contracts",
          "value": "38",
          "trend": {
            "value": "+3",
            "type": "positive"
          }
        },
        {
          "id": "expiringSoon",
          "icon": "expiringSoon",
          "title": "Expiring Soon",
          "value": "5",
          "trend": {
            "value": "30 days",
            "type": "warning"
          }
        },
        {
          "id": "seatUtilization",
          "icon": "seatUtilization",
          "title": "Seat Utilization",
          "value": "78%",
          "trend": {
            "value": "+4.2%",
            "type": "positive"
          }
        },
        {
          "id": "teamMRR",
          "icon": "teamMRR",
          "title": "Team MRR",
          "value": "$14,200",
          "trend": {
            "value": "+5.4%",
            "type": "positive"
          }
        }
      ],
      "contractsData": [
        {
          "id": 1,
          "contractId": "CTR-8FJ39K2L",
          "name": "Acme Corp - Q1",
          "manager": {
            "name": "Sarah Jenkins",
            "email": "sarah.jenkins@acme.com",
            "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png",
            "userId": "USR-8FJ39K2L"
          },
          "secondaryManagers": [
            {
              "name": "John Smith",
              "avatar": "https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png"
            },
            {
              "name": "Emily Chen",
              "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg"
            }
          ],
          "model": "fixed",
          "utilization": {
            "used": 8,
            "total": 10,
            "percent": 80
          },
          "scope": {
            "type": "courses",
            "count": 2,
            "items": [
              "Intro to UX Design",
              "Advanced Figma Masterclass"
            ]
          },
          "status": "active",
          "expiry": "Dec 31, 2024",
          "expiryDays": 45
        },
        {
          "id": 2,
          "contractId": "CTR-9XM45RN7",
          "name": "TechStart - Flex",
          "manager": {
            "name": "Mike Ross",
            "email": "mike.ross@techstart.io",
            "avatar": "https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png",
            "userId": "USR-9XM45RN7"
          },
          "secondaryManagers": [],
          "model": "credits",
          "utilization": {
            "used": 150,
            "total": 500,
            "percent": 30
          },
          "scope": {
            "type": "catalog",
            "count": null,
            "items": []
          },
          "status": "active",
          "expiry": "Never",
          "expiryDays": null
        },
        {
          "id": 3,
          "contractId": "CTR-7JK2L3P9",
          "name": "Design Co - Monthly",
          "manager": {
            "name": "Elena Rodriguez",
            "email": "elena.r@designco.com",
            "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg",
            "userId": "USR-7JK2L3P9"
          },
          "secondaryManagers": [
            {
              "name": "Tom Wilson",
              "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png"
            },
            {
              "name": "Amy Parker",
              "avatar": "https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png"
            },
            {
              "name": "David Lee",
              "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg"
            }
          ],
          "model": "sub",
          "utilization": {
            "used": 20,
            "total": 20,
            "percent": 100
          },
          "scope": {
            "type": "plan",
            "count": null,
            "items": [
              "Gold Plan"
            ]
          },
          "status": "expiring",
          "expiry": "Jan 15, 2025",
          "expiryDays": 25
        },
        {
          "id": 4,
          "contractId": "CTR-4MN8Q5R2",
          "name": "Enterprise Plus",
          "manager": {
            "name": "David Wilson",
            "email": "dwilson@enterprise.com",
            "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png",
            "userId": "USR-4MN8Q5R2"
          },
          "secondaryManagers": [
            {
              "name": "Rachel Green",
              "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg"
            }
          ],
          "model": "fixed",
          "utilization": {
            "used": 45,
            "total": 100,
            "percent": 45
          },
          "scope": {
            "type": "courses",
            "count": 5,
            "items": [
              "Leadership 101",
              "Project Management",
              "Agile Fundamentals",
              "Team Communication",
              "Remote Work Best Practices"
            ]
          },
          "status": "active",
          "expiry": "Mar 31, 2025",
          "expiryDays": 100
        },
        {
          "id": 5,
          "contractId": "CTR-3TY9P6Q8",
          "name": "Startup Bundle",
          "manager": {
            "name": "Lisa Thompson",
            "email": "lisa.t@startup.co",
            "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg",
            "userId": "USR-3TY9P6Q8"
          },
          "secondaryManagers": [],
          "model": "credits",
          "utilization": {
            "used": 80,
            "total": 200,
            "percent": 40
          },
          "scope": {
            "type": "catalog",
            "count": null,
            "items": []
          },
          "status": "expired",
          "expiry": "Nov 30, 2024",
          "expiryDays": -15
        }
      ]
    }
  },
  "team-members": {
    "source": "html/user&access management/teams/team members.html",
    "tables": [],
    "datasets": {
      "statsData": [
        {
          "id": "totalMembers",
          "icon": "totalMembers",
          "title": "Total Members",
          "value": "784",
          "trend": {
            "value": "+45",
            "type": "positive"
          }
        },
        {
          "id": "uniqueManagers",
          "icon": "uniqueManagers",
          "title": "Unique Managers",
          "value": "156",
          "trend": {
            "value": "+12",
            "type": "positive"
          }
        },
        {
          "id": "seatManagers",
          "icon": "seatManagers",
          "title": "Seat Managers",
          "value": "42",
          "trend": {
            "value": "+3",
            "type": "positive"
          }
        },
        {
          "id": "pendingInvites",
          "icon": "pendingInvites",
          "title": "Pending Invites",
          "value": "24",
          "trend": null
        }
      ],
      "membersData": [
        {
          "id": 1,
          "name": "Sarah Jenkins",
          "email": "sarah.jenkins@acme.com",
          "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png",
          "planName": "Acme Corp - Q1 2025",
          "planType": "subscription",
          "planId": "PLAN-ACM-001",
          "owner": {
            "name": "John Mitchell",
            "id": "USR-JM9284KL",
            "avatar": "https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png"
          },
          "role": "manager",
          "status": "accepted",
          "joined": "Jan 12, 2025",
          "joinedFull": "January 12, 2025 10:30:45 AM"
        },
        {
          "id": 2,
          "name": "Dave Smith",
          "email": "dave.smith@acme.com",
          "avatar": "https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png",
          "planName": "Acme Corp - Q1 2025",
          "planType": "subscription",
          "planId": "PLAN-ACM-001",
          "owner": {
            "name": "John Mitchell",
            "id": "USR-JM9284KL",
            "avatar": "https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png"
          },
          "role": "member",
          "status": "pending",
          "joined": "Invited Feb 10",
          "joinedFull": "Invited February 10, 2025 2:15:22 PM"
        },
        {
          "id": 3,
          "name": "Elena Rodriguez",
          "email": "elena@design.co",
          "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg",
          "planName": "Design Co - Monthly",
          "planType": "credits",
          "planId": "PLAN-DSN-042",
          "owner": {
            "name": "Maria Chen",
            "id": "USR-MC7361PQ",
            "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg"
          },
          "role": "seat",
          "status": "accepted",
          "joined": "Mar 01, 2025",
          "joinedFull": "March 01, 2025 9:45:18 AM"
        },
        {
          "id": 4,
          "name": "Michael Torres",
          "email": "michael.t@startup.io",
          "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png",
          "planName": "Startup.io - Annual",
          "planType": "subscription",
          "planId": "PLAN-STR-089",
          "owner": {
            "name": "Alex Kim",
            "id": "USR-AK5829NM",
            "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png"
          },
          "role": "manager",
          "status": "accepted",
          "joined": "Feb 15, 2025",
          "joinedFull": "February 15, 2025 3:22:09 PM"
        },
        {
          "id": 5,
          "name": "Lisa Wang",
          "email": "lisa.wang@techcorp.com",
          "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg",
          "planName": "TechCorp Enterprise",
          "planType": "credits",
          "planId": "PLAN-TCH-156",
          "owner": {
            "name": "Robert Chang",
            "id": "USR-RC4728HJ",
            "avatar": "https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png"
          },
          "role": "member",
          "status": "removed",
          "joined": "Dec 20, 2024",
          "joinedFull": "December 20, 2024 11:08:33 AM"
        }
      ]
    }
  },
  "all-products": {
    "source": "html/products/all products.html",
    "tables": [],
    "datasets": {
      "statsData": [
        {
          "id": "total",
          "icon": "totalProducts",
          "title": "Total Products",
          "value": "1,432",
          "filter": "all",
          "trend": {
            "value": "+5.2%",
            "type": "positive"
          }
        },
        {
          "id": "published",
          "icon": "published",
          "title": "Published",
          "value": "982",
          "filter": "published",
          "trend": {
            "value": "+12%",
            "type": "positive"
          }
        },
        {
          "id": "pending",
          "icon": "pendingApproval",
          "title": "Pending Approval",
          "value": "105",
          "filter": "pending",
          "trend": {
            "value": "+8",
            "type": "positive"
          }
        },
        {
          "id": "drafts",
          "icon": "drafts",
          "title": "Drafts",
          "value": "345",
          "filter": "draft",
          "trend": {
            "value": "0%",
            "type": "neutral"
          }
        }
      ],
      "productsData": [
        {
          "id": 1,
          "productId": "PROD-8329",
          "lwId": "course-ux-master",
          "title": "Complete UX Design Masterclass",
          "thumbnail": "https://i.ibb.co/XZwpwsqp/product1.webp",
          "instructor": {
            "id": "USR-7823",
            "name": "Sarah Johnson",
            "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png"
          },
          "type": "course",
          "price": "$89.00",
          "originalPrice": "$199.00",
          "discount": "55%",
          "status": "published",
          "enrollments": 1204,
          "salesLast30d": 45,
          "rating": 4.8,
          "reviewCount": 245,
          "created": "Jan 10, 2025",
          "createdFull": "January 10, 2025 2:30:00 PM",
          "updated": "Feb 15, 2025",
          "updatedFull": "February 15, 2025 10:45:22 AM",
          "linkedToSchool": true,
          "viewLinks": [
            "productDetails",
            "pricingHistory",
            "recommendations",
            "auditLog"
          ],
          "linkedTo": [
            "school",
            "enrollments",
            "transactions",
            "reviews",
            "coupons",
            "checklist",
            "apiLogs"
          ]
        },
        {
          "id": 2,
          "productId": "EVT-9921",
          "lwId": "live-session-01",
          "title": "Weekly Coaching Session",
          "thumbnail": "https://i.ibb.co/SwpdsBdp/product2.webp",
          "instructor": {
            "id": "USR-4521",
            "name": "Michael Chen",
            "avatar": "https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png"
          },
          "type": "event",
          "price": "$150.00",
          "originalPrice": null,
          "discount": null,
          "status": "published",
          "enrollments": 45,
          "salesLast30d": 12,
          "rating": 5,
          "reviewCount": 45,
          "created": "Feb 01, 2025",
          "createdFull": "February 01, 2025 9:15:00 AM",
          "updated": "Feb 20, 2025",
          "updatedFull": "February 20, 2025 3:22:18 PM",
          "linkedToSchool": true,
          "viewLinks": [
            "productDetails",
            "pricingHistory",
            "recommendations",
            "auditLog"
          ],
          "linkedTo": [
            "school",
            "enrollments",
            "transactions",
            "reviews",
            "coupons",
            "apiLogs"
          ]
        },
        {
          "id": 3,
          "productId": "BND-1123",
          "lwId": "bundle-fs-01",
          "title": "Full Stack Developer Path",
          "thumbnail": "https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg",
          "instructor": {
            "id": "USR-9012",
            "name": "Tech Academy",
            "avatar": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg"
          },
          "type": "bundle",
          "price": "$299.00",
          "originalPrice": null,
          "discount": null,
          "status": "pending",
          "enrollments": 0,
          "salesLast30d": 0,
          "rating": null,
          "reviewCount": 0,
          "created": "Feb 20, 2025",
          "createdFull": "February 20, 2025 11:00:00 AM",
          "updated": "Feb 22, 2025",
          "updatedFull": "February 22, 2025 4:15:33 PM",
          "linkedToSchool": false,
          "viewLinks": [
            "productDetails",
            "pricingHistory",
            "recommendations",
            "auditLog"
          ],
          "linkedTo": [
            "enrollments",
            "transactions",
            "coupons",
            "apiLogs"
          ]
        },
        {
          "id": 4,
          "productId": "COM-4412",
          "lwId": "community-designers",
          "title": "Designers Circle",
          "thumbnail": "https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg",
          "instructor": {
            "id": "USR-7823",
            "name": "Sarah Johnson",
            "avatar": "https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png"
          },
          "type": "community",
          "price": "Free",
          "originalPrice": null,
          "discount": null,
          "status": "draft",
          "enrollments": 500,
          "salesLast30d": 0,
          "rating": null,
          "reviewCount": 0,
          "created": "Jan 05, 2025",
          "createdFull": "January 05, 2025 8:45:00 AM",
          "updated": "Jan 18, 2025",
          "updatedFull": "January 18, 2025 2:30:15 PM",
          "linkedToSchool": false,
          "viewLinks": [
            "productDetails",
            "pricingHistory",
            "recommendations",
            "auditLog"
          ],
          "linkedTo": [
            "enrollments",
            "apiLogs"
          ]
        }
      ]
    }
  },
  "courses": {
    "source": "html/products/courses.html",
    "tables": [
      {
        "headers": [
          "Course",
          "School",
          "Price",
          "Status",
          "Enroll.",
          "Rating",
          "Duration",
          "Updated",
          "VIEW",
          "LINKED TO",
          "Column 11"
        ],
        "rows": [
          [
            "[[img:https://i.ibb.co/XZwpwsqp/product1.webp|Thumb]] Complete UX Design Masterclass CRS-8329 Internal: CRS-8329 | LW ID: course-ux-master • Sarah Johnson",
            "🎓 Design Academy",
            "$89.00 Original: $199.00 | Discount: 55%",
            "Published Platform: PUBLISHED | LW: Paid",
            "1,204 Total Sales: 1,204 | Last 30d: 45",
            "4.8 (245)",
            "18h 22m",
            "Feb 15 Feb 15, 2025 10:30 AM",
            "Details Pricing History Leaderboard FAQ & Testimonials",
            "Enrollments Sales Reviews Course Content Checklist API Log",
            "Preview Unpublish Manage Instructors"
          ],
          [
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Thumb]] Intro to Python for Data Science CRS-1053 Internal: CRS-1053 | LW ID: python-data-sci • Michael Chen",
            "📈 Data Nexus",
            "$129.00",
            "Pending Platform: PENDING_APPROVAL | LW: Draft",
            "0 No active enrollments",
            "N/A",
            "42h 5m",
            "Feb 28 Feb 28, 2025 3:05 PM",
            "Details Checklist",
            "Course Content",
            "Approve Reject Preview"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "event-products": {
    "source": "html/products/event products.html",
    "tables": [
      {
        "headers": [
          "Event Product",
          "Instructor",
          "Price",
          "Status",
          "Attendees",
          "Sessions",
          "Updated",
          "VIEW",
          "LINKED TO"
        ],
        "rows": [
          [
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Thumb]] Advanced UX Workshops EVT-4421 Internal: EVT-4421 | LW ID: event-ux-Adv",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|Inst]] Sarah Johnson",
            "$150.00 Original: $150.00",
            "Published",
            "45 Active Enrollments",
            "4 Live Sessions Included",
            "Feb 20, 2025 Last Mod: Feb 20, 14:30",
            "Details CPE Info",
            "Sessions Users Sales Coupons"
          ],
          [
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|Thumb]] 1:1 Career Coaching EVT-9912 Internal: EVT-9912 | LW ID: 1on1-career",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|Inst]] Michael Chen",
            "$250.00",
            "Draft",
            "0",
            "1",
            "Jan 15, 2025",
            "",
            ""
          ],
          [
            "[[img:https://i.ibb.co/XZwpwsqp/product1.webp|Thumb]] Group Strategy Session EVT-2231 Internal: EVT-2231 | LW ID: group-strat-01",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|Inst]] Sarah Johnson",
            "$50.00",
            "Pending",
            "12",
            "1",
            "Jan 28, 2025",
            "",
            ""
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "session-instances": {
    "source": "html/products/session instances.html",
    "tables": [
      {
        "headers": [
          "Session",
          "Parent Product",
          "Host",
          "Type",
          "Start Time",
          "Duration",
          "Status",
          "RSVPs",
          "VIEW",
          "LINKED TO",
          "Column 11"
        ],
        "rows": [
          [
            "1:1 Coaching Slot INST-98342 LW Event ID: evt_abc123",
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Thumb]] Weekly Coaching Session",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|Host]] Michael Chen",
            "1:1 Calendly",
            "Mar 15, 2025, 2:00 PM",
            "30 min",
            "Upcoming",
            "1",
            "Details Attendee List",
            "Parent Product Source Unit",
            "Actions"
          ],
          [
            "Project Kickoff INST-98343 LW Event ID: evt_def456",
            "[[img:https://i.ibb.co/XZwpwsqp/product1.webp|Thumb]] UX Design Masterclass",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|Host]] Sarah Johnson",
            "Zoom Meeting",
            "Mar 12, 2025, 10:00 AM",
            "60 min",
            "Completed",
            "125",
            "Details Attendee List",
            "Parent Product Host Profile Attendees",
            "Actions"
          ],
          [
            "Live AMA INST-98344 LW Event ID: evt_ghi789",
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|Thumb]] Community Launch",
            "[[img:https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg|Host]] Emily Rodriguez",
            "Live Session",
            "Mar 10, 2025, 7:00 PM",
            "45 min",
            "Live",
            "315",
            "Details",
            "Parent Product",
            "Actions"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "bundles": {
    "source": "html/products/bundles.html",
    "tables": [
      {
        "headers": [
          "Bundle",
          "Price",
          "Status",
          "Products",
          "Sales",
          "Rating",
          "Created",
          "VIEW",
          "LINKED TO",
          "Column 10"
        ],
        "rows": [
          [
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|Thumb]] Full Stack Developer Path BND-1123 Internal: BND-1123 | LW ID: bundle-fs-01 • Tech Academy",
            "$299.00 Original: $450.00 | Discount: 33%",
            "Published",
            "5 Click to view included products | (3 Courses, 2 Events)",
            "258 Total Lifetime Sales",
            "4.7 Weighted Avg Rating | Based on 412 reviews",
            "Feb 20, 2025 Updated: Mar 01, 2025",
            "Details Included Items Payment Plans",
            "Sales Included Courses Included Events API Log",
            "Sync with LW View as User"
          ],
          [
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Thumb]] Design Essentials Pack BND-9982 Internal: BND-9982 | LW ID: bundle-des-02 • Michael Chen",
            "$149.00 Original: $149.00 | Discount: 0%",
            "Draft",
            "3 Click to view products",
            "0 Total Lifetime Sales",
            "-",
            "Mar 02, 2025 Updated: Mar 02, 2025",
            "",
            "",
            "Sync with LW"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "course-content": {
    "source": "html/products/course content.html",
    "tables": [
      {
        "headers": [
          "Section / Unit Title",
          "Access / Type",
          "Drip / Duration",
          "Count / Preview",
          "VIEW",
          "LINKED TO",
          "ACTIONS"
        ],
        "rows": [
          [
            "1. Introduction to UX Design",
            "Public",
            "Immediate",
            "4 Units",
            "",
            "",
            "Edit Section Add Unit Delete"
          ],
          [
            "1.1 What is User Experience?",
            "Video",
            "04:25",
            "Preview Available",
            "Unit Details Analytics",
            "User Progress",
            "Edit Unit View as Student Delete"
          ],
          [
            "2. Research Methods",
            "Premium",
            "Drip: 7 Days",
            "2 Units",
            "",
            "",
            "Edit Section Delete"
          ],
          [
            "2.1 Research Guidelines",
            "PDF",
            "15 pages",
            "-",
            "Unit Details",
            "User Progress",
            "Edit Unit Delete"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "enrollments": {
    "source": "html/enrollment&progress/enrollments.html",
    "tables": [
      {
        "headers": [
          "ID",
          "User",
          "Product",
          "Enrolled",
          "Status",
          "Progress",
          "Source",
          "Expires",
          "VIEW",
          "LINKED TO",
          "Column 11"
        ],
        "rows": [
          [
            "ENR-4829 Copy ID",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User]] Alice Smith alice@example.com",
            "[[img:https://i.ibb.co/XZwpwsqp/product1.webp|Prod]] UX Design Masterclass Course",
            "Jan 15, 2025 Time: 14:30 EST",
            "Active",
            "45% 12/26 Units Completed",
            "Purchase",
            "Never",
            "Details Progress Breakdown Transaction",
            "User Profile Product Page Sales",
            "Revoke Access Reset Progress Mark as Complete"
          ],
          [
            "ENR-4830 Copy ID",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|User]] Bob Jones bob@example.com",
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Prod]] Python for Data Science Course",
            "Dec 10, 2024 Time: 09:15 EST",
            "Completed",
            "100% 45/45 Units Completed",
            "Subscription",
            "Feb 20, 2025",
            "",
            "Certificate",
            "Revoke Access"
          ],
          [
            "ENR-4831 Copy ID",
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|User]] Charlie Day charlie@example.com",
            "[[img:https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg|Prod]] Live SEO Workshop Event",
            "Jan 02, 2025 Time: 10:00 EST",
            "Expired",
            "10% 1/10 Units Completed",
            "Free Trial",
            "Feb 02, 2025",
            "",
            "",
            "Extend Access"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "user-subscriptions": {
    "source": "html/enrollment&progress/user subscriptions.html",
    "tables": [
      {
        "headers": [
          "User / Sub ID",
          "Plan",
          "Status",
          "Started",
          "Next Bill / Ends",
          "Renewal",
          "VIEW",
          "LINKED TO",
          "ACTIONS"
        ],
        "rows": [
          [
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User]] Sarah Johnson SUB-9921-X Copy ID",
            "Premium All-Access Team: N/A (Personal)",
            "Active",
            "Jan 15, 2025",
            "Feb 15, 2025",
            "$49.00 / MO",
            "Subscription Details Payment History Access Details",
            "User Profile Plan Transactions API Log",
            "Cancel Immediately Cancel at Period End Change Plan"
          ],
          [
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|User]] Michael Chen SUB-1142-A",
            "Basic Monthly Team: N/A",
            "Trialing",
            "Feb 01, 2025",
            "Feb 15, 2025",
            "$19.00 / MO",
            "",
            "",
            "Cancel Immediately Change Plan"
          ],
          [
            "[[img:https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg|User]] Emily Rodriguez SUB-0056-F",
            "Team Plan (Marketing) Team: Marketing Dept",
            "Cancelled",
            "Nov 10, 2024",
            "Dec 10, 2024",
            "$299.00 / YR",
            "",
            "",
            "Reactivate"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "user-progress": {
    "source": "html/enrollment&progress/user progress & analytics.html",
    "tables": [
      {
        "headers": [
          "User",
          "Product",
          "Status",
          "Progress",
          "Time Spent",
          "Units",
          "Avg Score",
          "Last Active",
          "VIEW",
          "LINKED TO",
          "ACTIONS"
        ],
        "rows": [
          [
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User]] Sarah Johnson ID: USR-8FJ3... Internal: USR-8FJ39K2L",
            "[[img:https://i.ibb.co/XZwpwsqp/product1.webp|Course]] UX Design Masterclass Type: COURSE Course ID: PROD-8329",
            "Started",
            "45% 12 / 27 Units Completed",
            "2h 15m Total Time on Course",
            "12 / 27",
            "85%",
            "Feb 22, 2025",
            "Detailed Unit Progress",
            "User Profile Product Page API Log",
            "Force Update Reset Progress"
          ],
          [
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|User]] Michael Chen ID: USR-9XM... Internal: USR-9XM45RN7",
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Event]] Weekly Coaching Type: EVENT Event ID: EVT-9921",
            "Completed",
            "100% 5 / 5 Sessions Attended",
            "5h 00m",
            "5 / 5",
            "-",
            "Jan 15, 2025",
            "",
            "",
            "Force Update Reset Progress"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "certificate-management": {
    "source": "html/enrollment&progress/certificate management.html",
    "tables": [
      {
        "headers": [
          "Certificate",
          "Product",
          "Tier",
          "Type",
          "Title",
          "Issued",
          "Status",
          "VIEW",
          "LINKED TO",
          "Column 10"
        ],
        "rows": [
          [
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User]] CERT-88219 Internal: CERT-88219 | Provider: CRT-XY-992 Sarah Johnson",
            "[[img:https://i.ibb.co/XZwpwsqp/product1.webp|Prod]] Complete UX Design Masterclass",
            "Premium Provider: Certifier.io",
            "Knowledge Exam-Based",
            "Certified UX Designer - L1 Certified UX Designer - Level 1",
            "Oct 15, 2024 Oct 15, 2024 10:30 AM",
            "Active",
            "View Details",
            "User Profile Product Page API Log",
            "View Online Delete / Revoke Re-issue"
          ],
          [
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|User]] CERT-11029 Internal: CERT-11029 | Provider: LW-CRT-554 Michael Chen",
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|Prod]] Intro to Python Programming",
            "Standard Provider: LearnWorlds",
            "Completion Activity-Based",
            "Certificate of Completion Certificate of Completion",
            "Sep 28, 2024 Sep 28, 2024 02:15 PM",
            "Active",
            "View Details",
            "User Profile Product Page API Log",
            "View Online Delete / Revoke Re-issue"
          ],
          [
            "[[img:https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg|User]] CERT-00991 Internal: CERT-00991 | Provider: CRT-ZZ-001 Emily Rodriguez",
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Prod]] Advanced React Patterns",
            "Premium Provider: Certifier.io",
            "Knowledge Exam-Based",
            "React Master React Master",
            "Aug 12, 2024 Aug 12, 2024 11:00 AM",
            "Revoked",
            "View Details",
            "User Profile Product Page API Log",
            "View Online Delete / Revoke Re-issue"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "transactions": {
    "source": "html/financials/transactions.html",
    "tables": [
      {
        "headers": [
          "ID",
          "Billing",
          "Amount",
          "Card",
          "Date",
          "Next Bill",
          "Method",
          "Status",
          "View",
          "Linked To",
          "Actions"
        ],
        "rows": [
          [
            "T-8FJ39K2L",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|Sarah Johnson]] Sarah Johnson 123 Main St, CA 94105 123 Main St, Suite 101 | San Francisco, CA 94105 | United States",
            "$199.99 Plan: Elevate",
            "4312",
            "Jan 15, 2025 Paid On: Jan 15, 2025 4:33:07 PM",
            "Feb 15, 2025 Next Bill: Feb 15, 2025 4:33:07 PM",
            "Stripe",
            "Success",
            "Invoice Plan",
            "User Refund",
            "View Refund Update Billing"
          ],
          [
            "T-9XM45RN7",
            "MC Michael Chen 45 Park Lane, NSW 2000 45 Park Lane, Suite 300 | Sydney, NSW 2000 | Australia",
            "$49.99 Plan: Grow",
            "8712",
            "Jan 28, 2025 Paid On: Jan 28, 2025 9:12:45 AM",
            "N/A No future billing",
            "PayPal",
            "Refunded",
            "Invoice Plan",
            "User Payment",
            "View Update Billing"
          ],
          [
            "T-7JK2L3P9",
            "ER Emily Rodriguez 82 Oxford St, London W1D 1LL 82 Oxford Street, Flat 5 | London, W1D 1LL | United Kingdom",
            "$149.99 Plan: Empower",
            "5532",
            "Feb 10, 2025 Paid On: Feb 10, 2025 2:45:30 PM",
            "Mar 10, 2025 Next Bill: Mar 10, 2025 2:45:30 PM",
            "Paddle",
            "Processing",
            "Invoice Plan",
            "User Refund",
            "View Cancel Update Billing Refund"
          ]
        ]
      },
      {
        "headers": [
          "Item",
          "Description",
          "Qty",
          "Amount"
        ],
        "rows": [
          [
            "Elevate Plan",
            "Monthly subscription",
            "1",
            "$199.99"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "subscription-plans": {
    "source": "html/financials/subscription plans.html",
    "tables": [
      {
        "headers": [
          "Plan Name Plan Name & Internal/LW IDs",
          "Pricing Price & Billing Cycle",
          "Status Plan Access Status",
          "Products Products Included Count",
          "Subscribers Active Subscribers Count",
          "Created Creation Date",
          "VIEW",
          "LINKED TO",
          "ACTIONS"
        ],
        "rows": [
          [
            "All Access Monthly Internal: PLAN-001 | LW ID: sub-monthly-001",
            "$29.00 / month",
            "Published",
            "42 Click to view list",
            "1,250 Active Subscribers",
            "Jan 10, 2024 Full Date: Jan 10, 2024 10:00 AM",
            "Plan Details",
            "User Subscriptions Included Courses Included Events",
            "Sync with LearnWorlds View in LearnWorlds"
          ],
          [
            "All Access Yearly Internal: PLAN-002 | LW ID: sub-yearly-001",
            "$290.00 / year",
            "Published",
            "42 Click to view list",
            "850 Active Subscribers",
            "Jan 10, 2024 Full Date: Jan 10, 2024 10:05 AM",
            "Plan Details",
            "User Subscriptions Included Courses Included Events",
            "Sync with LearnWorlds View in LearnWorlds"
          ],
          [
            "VIP Bundle Access Internal: PLAN-003 | LW ID: sub-vip-001",
            "$99.00 / month",
            "Draft",
            "10 Click to view list",
            "0",
            "Feb 15, 2024 Full Date: Feb 15, 2024 2:30 PM",
            "Plan Details",
            "User Subscriptions Included Courses",
            "Sync with LearnWorlds View in LearnWorlds"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "payouts": {
    "source": "html/financials/payouts.html",
    "tables": [
      {
        "headers": [
          "ID",
          "Instructor",
          "Date",
          "Period",
          "Gross",
          "Fee",
          "Net Amount",
          "Method",
          "Status",
          "Gateway ID",
          "VIEW",
          "LINKED TO",
          "Column 13"
        ],
        "rows": [
          [
            "PAY-8329 ID: 8329-abcd-efgh-1234",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|Avatar]] Sarah Johnson",
            "Feb 15, 2025",
            "Jan 01 - Jan 31",
            "$1,200.00",
            "-$360.00",
            "$840.00",
            "PayPal",
            "Completed",
            "BATCH-99... BATCH-9921-PAYPAL-ID",
            "Payout Details",
            "Instructor Profile API Log",
            "View in PayPal"
          ],
          [
            "PAY-8330 ID: 8330-fail-efgh-5678",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|Avatar]] Michael Chen",
            "Feb 15, 2025",
            "Jan 01 - Jan 31",
            "$450.00",
            "-$135.00",
            "$315.00",
            "PayPal",
            "Failed",
            "BATCH-99... BATCH-9921-PAYPAL-ID",
            "Payout Details Error Details",
            "Instructor Profile API Log",
            "Retry Payout View in PayPal"
          ],
          [
            "- Pending Run",
            "[[img:https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg|Avatar]] Lisa Thompson",
            "-",
            "Feb 01 - Feb 28",
            "$2,000.00",
            "-$600.00",
            "$1,400.00",
            "PayPal",
            "Eligible",
            "-",
            "Payout Details",
            "Instructor Profile",
            "Cancel Payout"
          ],
          [
            "PAY-MAN-01 ID: PAY-MANUAL-001",
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|Avatar]] David Wilson",
            "Feb 10, 2025",
            "Adjustment",
            "$500.00",
            "$0.00",
            "$500.00",
            "Manual",
            "Completed",
            "-",
            "Payout Details",
            "Instructor Profile",
            ""
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "coupons": {
    "source": "html/financials/coupons & promotions.html",
    "tables": [
      {
        "headers": [
          "Column 1",
          "Promotion",
          "LW ID",
          "Coupons",
          "Redemptions",
          "Created",
          "Column 7",
          "Code",
          "Type",
          "Value",
          "Usage",
          "Applies To",
          "Status",
          "Expires",
          "VIEW",
          "LINKED"
        ],
        "rows": [
          [
            "",
            "Summer Sale 2025 PRM-832 Internal ID: PRM-832",
            "promo_summer_25 LearnWorlds Promotion ID",
            "3",
            "1,245",
            "Jan 15, 2025",
            "Edit Promotion New Coupon Delete",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "SUMMER25",
            "Percentage",
            "25%",
            "450 / 1K 450 Used / 1000 Limit",
            "All Products Includes all Courses & Events",
            "Active",
            "Jun 30, 2025",
            "Details Redemptions",
            "Transactions Products",
            "Edit Deactivate Delete",
            "",
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "SUMMER10",
            "Fixed Amt",
            "$10.00",
            "500 / 500 Max Limit Reached",
            "Specific Products UX Design, Python Masterclass",
            "Expired",
            "Feb 15, 2025",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "collections": {
    "source": "html/community & engagement/communities-collections.html",
    "tables": [
      {
        "headers": [
          "ID",
          "Icon",
          "Title",
          "Type",
          "Owner",
          "Visibility",
          "Created",
          "Count",
          "Modified",
          "Linked To",
          "Actions"
        ],
        "rows": [
          [
            "C-B3H7K9A2",
            "🎨",
            "Design Inspiration",
            "Collection",
            "U-8A2F9C3D",
            "Featured",
            "Feb 15, 2025 Created: Feb 15, 2025 4:33:07 PM",
            "48",
            "Feb 27, 2025 Modified: Feb 27, 2025 10:15:22 AM",
            "User Items",
            "View Edit Delete"
          ],
          [
            "C-F2K8L7P9",
            "📚",
            "Learning Resources",
            "Bookmark",
            "U-3F7G2H9J",
            "Public",
            "Jan 20, 2025 Created: Jan 20, 2025 11:28:45 AM",
            "72",
            "Feb 28, 2025 Modified: Feb 28, 2025 3:45:12 PM",
            "User Items",
            "View Edit Delete"
          ],
          [
            "C-P9L4R2H7",
            "👩‍💻",
            "Learning Tools",
            "Collection",
            "U-7D9E4F1A",
            "Private",
            "Feb 05, 2025 Created: Feb 05, 2025 9:17:32 AM",
            "34",
            "Feb 25, 2025 Modified: Feb 25, 2025 5:42:18 PM",
            "User Items",
            "View Edit Delete"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "posts": {
    "source": "html/community & engagement/communities-posts.html",
    "tables": [
      {
        "headers": [
          "Post / Space",
          "Author",
          "Content",
          "Engagmt.",
          "Attach.",
          "Status",
          "Posted",
          "VIEW",
          "LINKED TO",
          "Column 10"
        ],
        "rows": [
          [
            "POST-832 Internal: POST-832 | LW ID: lw-post-99881 Announcements",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|Author]] Sarah Johnson Click to view User Profile",
            "Welcome to the new course! Here are some rules... Full text available in View Details",
            "👍 154 Likes 🔼 89 Upvotes",
            "2 1 Image, 1 File",
            "Pinned",
            "Feb 25, 2025 Posted: Feb 25, 2025 09:30 AM",
            "Full Details",
            "Author Parent Space API Log",
            "Hide Post Delete Post"
          ],
          [
            "POST-845 Internal: POST-845 | LW ID: lw-post-99892 General",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|Author]] Michael Chen",
            "Has anyone finished the module on CSS Grid yet? Full text available in View Details",
            "👍 12 Likes 🔼 4 Upvotes",
            "-",
            "Published",
            "Feb 24, 2025 Posted: Feb 24, 2025 02:15 PM",
            "Full Details",
            "",
            "Hide Post Delete Post"
          ],
          [
            "POST-842 Internal: POST-842 | LW ID: lw-post-99889 Random",
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Author]] Unknown User",
            "Spam content detected in this post... Full text available in View Details",
            "👍 0 Likes 🔼 0 Upvotes",
            "-",
            "Hidden",
            "Feb 23, 2025 Posted: Feb 23, 2025 08:45 PM",
            "Full Details",
            "",
            "Unhide Post Delete Post"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "spaces": {
    "source": "html/community & engagement/communities-spaces.html",
    "tables": [
      {
        "headers": [
          "Space",
          "Collection",
          "Access",
          "Owner",
          "Linked To",
          "Members",
          "Posts",
          "Created",
          "VIEW",
          "LINKED TO",
          "ACTIONS"
        ],
        "rows": [
          [
            "📢 Announcements SPC-8392 Internal: SPC-8392 | LW ID: space-announce-01",
            "General Info",
            "Public",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|Avatar]] Sarah J.",
            "Course: Intro to UX... Course: Intro to UX Design Course: Advanced UX Principles",
            "1,240",
            "54",
            "Jan 12, 2025 Created: Jan 12, 2025 09:30 AM",
            "Space Details Usage / Links",
            "Collection Members Posts +2 Invited, API Log",
            "Edit Space Invite Users Sync with LW Delete Space"
          ],
          [
            "🎓 Cohort 2025 Discussion SPC-9912 Internal: SPC-9912 | LW ID: space-cohort-25",
            "Student Hub",
            "Private",
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Avatar]] Michael C.",
            "Course: Full Stack... Course: Full Stack Mastery",
            "42",
            "128",
            "Feb 01, 2025 Created: Feb 01, 2025 10:00 AM",
            "",
            "",
            "Edit Space Invite Users Sync with LW Delete Space"
          ],
          [
            "🚀 Beta Testers SPC-7721 Internal: SPC-7721 | LW ID: space-beta",
            "System",
            "Standalone",
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|Avatar]] Admin",
            "Manual Invite Only No automatic product links",
            "15",
            "89",
            "Feb 20, 2025 Created: Feb 20, 2025 04:15 PM",
            "",
            "",
            "Edit Space Invite Users Sync with LW Delete Space"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "reviews": {
    "source": "html/community & engagement/reviews & ratings.html",
    "tables": [
      {
        "headers": [
          "Review ID",
          "Item",
          "Rating",
          "User",
          "Reason",
          "Comment",
          "Date",
          "Type",
          "Status",
          "Linked to",
          "Actions"
        ],
        "rows": [
          [
            "R-A7B9C3D2",
            "[[img:https://i.ibb.co/XZwpwsqp/product1.webp|Item thumbnail]] The Complete Guide... ITM-A7B9C3",
            "4.5",
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|User avatar]] John Smith johns...le.com",
            "Great insights...",
            "This book provides exc...",
            "Feb 28, 2025 Feb 28, 2025 14:32:21 PM",
            "Books",
            "Published",
            "View Item User Profile",
            "Edit Approve Reject Delete"
          ],
          [
            "R-B8D1E6F3",
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Item thumbnail]] JavaScript: The Def... ITM-B8D1E6",
            "5.0",
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|User avatar]] Mary Jones maryj...le.com",
            "Comprehensive re...",
            "This is the best Java...",
            "Feb 27, 2025 Feb 27, 2025 09:45:17 AM",
            "Books",
            "Published",
            "View Item User Profile",
            "Edit Approve Reject Delete"
          ],
          [
            "R-C5G7H1J9",
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Item thumbnail]] Historia de España... ITM-C5G7H1",
            "2.5",
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|User avatar]] Carlos Rodriguez carlo...le.com",
            "Lacks depth on...",
            "El podcast no profundiza...",
            "Feb 27, 2025 Feb 27, 2025 15:17:52 PM",
            "Podcasts",
            "Rejected",
            "View Item User Profile",
            "Edit Approve Delete"
          ],
          [
            "R-D2K8L4M7",
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Item thumbnail]] Artificial Intelli... ITM-D2K8L4",
            "4.0",
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|User avatar]] Alex Thompson alex@...le.com",
            "Excellent techni...",
            "This book is the gold...",
            "Feb 25, 2025 Feb 25, 2025 10:22:37 AM",
            "Books",
            "Pending",
            "View Item User Profile",
            "Edit Approve Reject Delete"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "schools": {
    "source": "html/community & engagement/schools.html",
    "tables": [
      {
        "headers": [
          "School",
          "Desc",
          "Owner(s)",
          "Products",
          "Members",
          "Posts (7d)",
          "Status",
          "Created",
          "VIEW",
          "LINKED TO",
          "Column 11"
        ],
        "rows": [
          [
            "🎨 Design Academy SCH-8392 School Name: Design Academy | ID: SCH-8392",
            "Premier destination for UI... Premier destination for UI/UX designers looking to master their craft.",
            "[[img:https://i.ibb.co/XZwpwsqp/product1.webp|Owner]] Sarah J. +2 Primary: Sarah Johnson | Co-owners: Mike T., Lisa R.",
            "154 Courses: 142, Events: 12",
            "2,890",
            "342",
            "Active",
            "Jan 10, 2024 Created: Jan 10, 2024 09:30 AM",
            "School Details Leaderboard",
            "Courses Events Certificates Members +2",
            "Edit School Deactivate View Public Page"
          ],
          [
            "💻 Tech Hub SCH-9210 School Name: Tech Hub | ID: SCH-9210",
            "All things coding, devops... All things coding, devops, and cloud infrastructure for the modern engineer.",
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Owner]] David L. Primary: David Lee",
            "89 Courses: 80, Events: 9",
            "2,450",
            "128",
            "Active",
            "Mar 02, 2024 Created: Mar 02, 2024 02:15 PM",
            "",
            "+2",
            ""
          ],
          [
            "📣 Marketing Pro SCH-3321 School Name: Marketing Pro | ID: SCH-3321",
            "Master digital marketi... Master digital marketing strategies for 2025.",
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|Owner]] Emily R. Primary: Emily Rodriguez",
            "45 Courses: 40, Events: 5",
            "1,105",
            "342",
            "Inactive",
            "Nov 15, 2023 Created: Nov 15, 2023 11:00 AM",
            "",
            "+2",
            ""
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "platform-settings": {
    "source": "html/platform/platform settings.html",
    "tables": [
      {
        "headers": [
          "Item Name",
          "Description",
          "Logic",
          "Status",
          "Actions"
        ],
        "rows": [
          [
            "Bio Length",
            "Bio must be > 200 chars",
            "min_length: 200",
            "Active",
            ""
          ],
          [
            "Profile Image",
            "Must have avatar uploaded",
            "exists: avatar_url",
            "Active",
            ""
          ]
        ]
      },
      {
        "headers": [
          "Icon",
          "Name",
          "Trigger Tag",
          "Description",
          "Actions"
        ],
        "rows": [
          [
            "🏆",
            "First Sale",
            "__badge_first_sale",
            "Awarded after first sale.",
            ""
          ]
        ]
      },
      {
        "headers": [
          "Page / Feature",
          "Read Only",
          "Read + Write"
        ],
        "rows": [
          [
            "User Management",
            "",
            ""
          ],
          [
            "Product Management",
            "",
            ""
          ],
          [
            "Financials",
            "",
            ""
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "form-submissions": {
    "source": "html/platform/from submissions.html",
    "tables": [
      {
        "headers": [
          "Submission",
          "Submitter",
          "Subject / Target",
          "Submitted",
          "Status",
          "Assigned",
          "VIEW",
          "LINKED TO",
          "Column 9"
        ],
        "rows": [
          [
            "#FORM-1023 Support Request",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|Avatar]] Sarah Johnson sarah.j@example.com",
            "Trouble accessing Course content...",
            "Mar 01, 2025 March 01, 2025 09:42 AM",
            "New",
            "Unassigned",
            "View Details",
            "",
            "Reply Change Status Assign to Me Delete"
          ],
          [
            "#FORM-1022 Instructor App",
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Avatar]] Michael Chen m.chen@test.com",
            "Application to teach UX Design",
            "Feb 28, 2025 February 28, 2025 02:15 PM",
            "Pending Review",
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|]] David W.",
            "View Application",
            "Applicant Profile",
            "Approve Reject Reassign"
          ],
          [
            "#FORM-1021 Review Report",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|Avatar]] Emily R. emily@test.com",
            "Review #REV-9921",
            "Feb 27, 2025 February 27, 2025 11:30 AM",
            "Resolved",
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|]] David W.",
            "View Report",
            "Go to Review",
            "Reopen Archive"
          ],
          [
            "#FORM-1020 Refund Request",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|Avatar]] Sarah Johnson sarah.j@example.com",
            "Transaction #TRX-5512",
            "Feb 26, 2025 February 26, 2025 04:20 PM",
            "Open",
            "Unassigned",
            "View Request",
            "Go to Transaction",
            "Process Refund Reject Request Assign"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "team-plans": {
    "source": "html/platform/team plans.html",
    "tables": [
      {
        "headers": [
          "Plan Name",
          "Manager",
          "Utilization",
          "Products",
          "LW MSO",
          "Purchased",
          "Status",
          "VIEW",
          "LINKED TO",
          "Column 10"
        ],
        "rows": [
          [
            "Marketing Team - Q1 ID: TP-839201",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|Manager]] Sarah Johnson",
            "8/10",
            "5 Included Courses: | - Intro to UX | - Advanced Marketing | ...",
            "Linked: MSO-92837",
            "Jan 15, 2025",
            "Active",
            "Plan Details Included Products",
            "Manager Profile Team Members Transaction",
            "Manage Members Sync MSO"
          ]
        ]
      },
      {
        "headers": [
          "Plan Name",
          "Manager",
          "Credits Remaining",
          "Members",
          "Redemptions",
          "Purchased",
          "Status",
          "VIEW",
          "ACTIONS"
        ],
        "rows": [
          [
            "Design Team Credits ID: TP-CRED-01",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|Manager]] Michael Chen",
            "40/100",
            "12",
            "60",
            "Feb 01, 2025",
            "Active",
            "Credit History",
            "Manage Members Adjust Credits"
          ]
        ]
      },
      {
        "headers": [
          "Plan Name",
          "Manager",
          "Subscription",
          "Seats",
          "Billing",
          "Next Renewal",
          "Status",
          "ACTIONS"
        ],
        "rows": [
          [
            "Engineering Training ID: TP-SUB-99",
            "[[img:https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg|Manager]] David Lee",
            "All-Access Annual",
            "45/50",
            "$4,500 / Year",
            "Dec 15, 2025",
            "Active",
            "Cancel Subscription Sync Members to MSO View Invoices"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "notifications": {
    "source": "html/platform/notifications.html",
    "tables": [
      {
        "headers": [
          "ID",
          "Recipient",
          "Type",
          "Title / Message",
          "Status",
          "Sent At",
          "VIEW",
          "LINKED TO",
          "ACTIONS"
        ],
        "rows": [
          [
            "NT-8392 ID: 8a4c9b3e-2f...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "STUDENT_ENROLLMENT",
            "You were enrolled into Intro to UX Design You were enrolled into Intro to UX Design",
            "Unread",
            "Oct 12, 14:30 Oct 12, 2024 14:30:15",
            "Payload Details",
            "Recipient Profile Enrolled Course",
            "Mark as Read Delete"
          ],
          [
            "NT-2154 ID: c2b8d1a4-9e...",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|User Avatar]] Michael Chen",
            "BADGE_AWARDED",
            "You earned the Course Connoisseur badge! You earned the Course Connoisseur badge!",
            "Read",
            "Oct 11, 09:15 Oct 11, 2024 09:15:22",
            "Payload Details",
            "Recipient Profile",
            "Mark as Unread Delete"
          ],
          [
            "NT-5591 ID: f5d3a9b1-2c...",
            "[[img:https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg|User Avatar]] Emily Rodriguez",
            "SYSTEM",
            "Scheduled Maintenance on Oct 15 Scheduled Maintenance on Oct 15",
            "Unread",
            "Oct 10, 11:00 Oct 10, 2024 11:00:00",
            "Payload Details",
            "Recipient Profile",
            "Mark as Read Delete"
          ],
          [
            "NT-1234 ID: a1b2c3d4-5e...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] John Doe",
            "NEW_FOLLOWER",
            "Lily-Rose followed you Lily-Rose followed you",
            "Unread",
            "Oct 09, 16:20 Oct 09, 2024 16:20:00",
            "Payload Details",
            "Recipient Profile",
            "Mark as Read Delete"
          ],
          [
            "NT-1235 ID: a2b3c4d5-6f...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "NEW_SALE",
            "New Sale! Jane Doe purchased My Awesome Course New Sale! Jane Doe purchased My Awesome Course",
            "Unread",
            "Oct 09, 14:00 Oct 09, 2024 14:00:00",
            "Payload Details",
            "Recipient Profile Transaction",
            "Mark as Read Delete"
          ],
          [
            "NT-1236 ID: b3c4d5e6-7g...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Michael Chen",
            "CPE_DEADLINE",
            "Your CPE deadline is in 14 days! You are still missing hours in: Ethics Your CPE deadline is in 14 days! You are still missing hours in: Ethics",
            "Unread",
            "Oct 08, 10:00 Oct 08, 2024 10:00:00",
            "Payload Details",
            "Recipient Profile",
            "Mark as Read Delete"
          ],
          [
            "NT-1237 ID: c4d5e6f7-8h...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "NEW_PRODUCT_FOLLOWED",
            "Sarah Johnson, who you follow, just published a new course: The Ultimate Guide Sarah Johnson, who you follow, just published a new course: The Ultimate Guide",
            "Unread",
            "Oct 07, 15:30 Oct 07, 2024 15:30:00",
            "Payload Details",
            "Recipient Profile Course",
            "Mark as Read Delete"
          ],
          [
            "NT-1238 ID: d5e6f7g8-9i...",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|User Avatar]] Michael Chen",
            "COURSE_COMPLETED",
            "Congratulations! You've completed Intro to UX Design Congratulations! You've completed Intro to UX Design",
            "Unread",
            "Oct 06, 12:00 Oct 06, 2024 12:00:00",
            "Payload Details",
            "Recipient Profile Course",
            "Mark as Read Delete"
          ],
          [
            "NT-1239 ID: e6f7g8h9-0j...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "STANDARD_CERT_AWARDED",
            "Your certificate for Advanced Leadership is ready Your certificate for Advanced Leadership is ready",
            "Unread",
            "Oct 05, 14:00 Oct 05, 2024 14:00:00",
            "Payload Details",
            "Recipient Profile Certificates",
            "Mark as Read Delete"
          ],
          [
            "NT-1240 ID: f7g8h9i0-1k...",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|User Avatar]] Michael Chen",
            "PREMIUM_CERT_REDEEMED",
            "Your premium certificate for Advanced Leadership has been issued Your premium certificate for Advanced Leadership has been issued",
            "Unread",
            "Oct 04, 11:30 Oct 04, 2024 11:30:00",
            "Payload Details",
            "Recipient Profile Certificates",
            "Mark as Read Delete"
          ],
          [
            "NT-1241 ID: g8h9i0j1-2l...",
            "[[img:https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg|User Avatar]] Emily Rodriguez",
            "DRIP_CONTENT_UNLOCKED",
            "New content unlocked in Advanced Marketing New content unlocked in Advanced Marketing",
            "Unread",
            "Oct 03, 09:00 Oct 03, 2024 09:00:00",
            "Payload Details",
            "Recipient Profile Course",
            "Mark as Read Delete"
          ],
          [
            "NT-1242 ID: h9i0j1k2-3m...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "UPCOMING_LIVE_SESSION",
            "Reminder: Weekly Q&A starts in 1 hour Reminder: Weekly Q&A starts in 1 hour",
            "Unread",
            "Oct 02, 17:00 Oct 02, 2024 17:00:00",
            "Payload Details",
            "Recipient Profile Event",
            "Mark as Read Delete"
          ],
          [
            "NT-1243 ID: i0j1k2l3-4n...",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|User Avatar]] Michael Chen",
            "REVIEW_PUBLISHED",
            "Your review for Intro to UX Design has been published Your review for Intro to UX Design has been published",
            "Unread",
            "Oct 01, 15:00 Oct 01, 2024 15:00:00",
            "Payload Details",
            "Recipient Profile Review",
            "Mark as Read Delete"
          ],
          [
            "NT-1244 ID: j1k2l3m4-5o...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "REVIEW_SUBMITTED",
            "Thanks for your feedback! Your review for Intro to UX Design is pending approval Thanks for your feedback! Your review for Intro to UX Design is pending approval",
            "Unread",
            "Sep 30, 10:00 Sep 30, 2024 10:00:00",
            "Payload Details",
            "Recipient Profile Review",
            "Mark as Read Delete"
          ],
          [
            "NT-1245 ID: k2l3m4n5-6p...",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|User Avatar]] Michael Chen",
            "TRIAL_STARTED",
            "Your free trial for ComfamaPro- Mensual has started! It will end on Apr 04 2023. Your free trial for ComfamaPro- Mensual has started! It will end on Apr 04 2023.",
            "Unread",
            "Sep 28, 11:15 Sep 28, 2024 11:15:00",
            "Payload Details",
            "Recipient Profile Subscription",
            "Mark as Read Delete"
          ],
          [
            "NT-1246 ID: l3m4n5o6-7q...",
            "[[img:https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg|User Avatar]] Emily Rodriguez",
            "PAYMENT_PLAN_UPDATE",
            "Payment plan update for Advanced Data Science : you've made payment 2/10 Payment plan update for Advanced Data Science: you've made payment 2/10",
            "Unread",
            "Sep 25, 08:30 Sep 25, 2024 08:30:00",
            "Payload Details",
            "Recipient Profile Transactions",
            "Mark as Read Delete"
          ],
          [
            "NT-1247 ID: m4n5o6p7-8r...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "SESSION_SCHEDULED",
            "You've scheduled a session: 1:1 Coaching with Jane for the course Advanced Leadership You've scheduled a session: 1:1 Coaching with Jane for the course Advanced Leadership",
            "Unread",
            "Sep 20, 14:00 Sep 20, 2024 14:00:00",
            "Payload Details",
            "Recipient Profile Event",
            "Mark as Read Delete"
          ],
          [
            "NT-1248 ID: n5o6p7q8-9s...",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|User Avatar]] Michael Chen",
            "NEW_ENROLLMENT",
            "Jane Doe has enrolled in My Awesome Course Jane Doe has enrolled in My Awesome Course",
            "Unread",
            "Sep 15, 10:00 Sep 15, 2024 10:00:00",
            "Payload Details",
            "Recipient Profile Course",
            "Mark as Read Delete"
          ],
          [
            "NT-1249 ID: o6p7q8r9-0t...",
            "[[img:https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg|User Avatar]] Emily Rodriguez",
            "REVIEW_RECEIVED",
            "John Smith left a 5-star review on My Awesome Course John Smith left a 5-star review on My Awesome Course",
            "Unread",
            "Sep 10, 15:45 Sep 10, 2024 15:45:00",
            "Payload Details",
            "Recipient Profile Review",
            "Mark as Read Delete"
          ],
          [
            "NT-1250 ID: p7q8r9s0-1u...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "PRODUCT_PUBLISHED",
            "Congratulations! Your product My Awesome Course is now live Congratulations! Your product My Awesome Course is now live",
            "Unread",
            "Sep 05, 12:00 Sep 05, 2024 12:00:00",
            "Payload Details",
            "Recipient Profile Course",
            "Mark as Read Delete"
          ],
          [
            "NT-1251 ID: q8r9s0t1-2v...",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|User Avatar]] Michael Chen",
            "PAYOUT_SENT",
            "A payout of $540.50 has been sent to your account A payout of $540.50 has been sent to your account",
            "Unread",
            "Sep 01, 09:00 Sep 01, 2024 09:00:00",
            "Payload Details",
            "Recipient Profile Payout",
            "Mark as Read Delete"
          ],
          [
            "NT-1252 ID: r9s0t1u2-3w...",
            "[[img:https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg|User Avatar]] Emily Rodriguez",
            "CO_INSTRUCTOR_ADDED",
            "Jane Doe has added you as a co-instructor for Advanced React Jane Doe has added you as a co-instructor for Advanced React",
            "Unread",
            "Aug 28, 14:30 Aug 28, 2024 14:30:00",
            "Payload Details",
            "Recipient Profile Course",
            "Mark as Read Delete"
          ],
          [
            "NT-1253 ID: s0t1u2v3-4x...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "COMMENT_ON_POST",
            "John Smith commented on your post in General Discussion John Smith commented on your post in General Discussion",
            "Unread",
            "Aug 20, 11:00 Aug 20, 2024 11:00:00",
            "Payload Details",
            "Recipient Profile Post",
            "Mark as Read Delete"
          ],
          [
            "NT-1254 ID: t1u2v3w4-5y...",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|User Avatar]] Michael Chen",
            "REPLY_TO_COMMENT",
            "Jane Doe replied to your comment in General Discussion Jane Doe replied to your comment in General Discussion",
            "Unread",
            "Aug 18, 16:30 Aug 18, 2024 16:30:00",
            "Payload Details",
            "Recipient Profile Comment",
            "Mark as Read Delete"
          ],
          [
            "NT-1255 ID: u2v3w4x5-6z...",
            "[[img:https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg|User Avatar]] Emily Rodriguez",
            "MENTIONED_IN_POST",
            "John Smith mentioned you in General Discussion John Smith mentioned you in General Discussion",
            "Unread",
            "Aug 15, 12:15 Aug 15, 2024 12:15:00",
            "Payload Details",
            "Recipient Profile Post",
            "Mark as Read Delete"
          ],
          [
            "NT-1256 ID: v3w4x5y6-7z...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "POST_LIKED",
            "Jane Doe liked your post Jane Doe liked your post",
            "Unread",
            "Aug 12, 09:30 Aug 12, 2024 09:30:00",
            "Payload Details",
            "Recipient Profile Post",
            "Mark as Read Delete"
          ],
          [
            "NT-1257 ID: x6y7z8a9-0b...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "NEW_LOGIN",
            "We detected a new login to your account from Chrome on Windows We detected a new login to your account from Chrome on Windows",
            "Unread",
            "Aug 10, 20:00 Aug 10, 2024 20:00:00",
            "Payload Details",
            "Recipient Profile",
            "Mark as Read Delete"
          ],
          [
            "NT-1258 ID: c1d2e3f4-5g...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "SUBSCRIPTION_CANCELED",
            "Your Monthly Premium Plan subscription has been canceled Your Monthly Premium Plan subscription has been canceled",
            "Unread",
            "Aug 05, 08:00 Aug 05, 2024 08:00:00",
            "Payload Details",
            "Recipient Profile",
            "Mark as Read Delete"
          ],
          [
            "NT-1259 ID: h6i7j8k9-0l...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "PAYMENT_FAILED",
            "Your payment of $29.99 for Monthly Premium Plan failed Your payment of $29.99 for Monthly Premium Plan failed. Please update your payment method.",
            "Unread",
            "Jul 30, 09:15 Jul 30, 2024 09:15:00",
            "Payload Details",
            "Recipient Profile",
            "Mark as Read Delete"
          ],
          [
            "NT-1260 ID: m3n4o5p6-7q...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "TEAM_INVITATION",
            "John Smith has invited you to join the Marketing Dept Plan team John Smith has invited you to join the Marketing Dept Plan team",
            "Unread",
            "Jul 15, 14:00 Jul 15, 2024 14:00:00",
            "Payload Details",
            "Recipient Profile",
            "Mark as Read Delete"
          ],
          [
            "NT-1261 ID: r4s5t6u7-8v...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "SUBSCRIPTION_CHANGED",
            "Your subscription has been changed from Basic Monthly to Premium Monthly Your subscription has been changed from Basic Monthly to Premium Monthly",
            "Unread",
            "Jun 30, 10:00 Jun 30, 2024 10:00:00",
            "Payload Details",
            "Recipient Profile",
            "Mark as Read Delete"
          ],
          [
            "NT-1262 ID: v9w0x1y2-3z...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "TRIAL_EXPIRED",
            "Your free trial for Premium Monthly has ended. Your first payment will be processed soon. Your free trial for Premium Monthly has ended. Your first payment will be processed soon.",
            "Unread",
            "Jun 15, 08:00 Jun 15, 2024 08:00:00",
            "Payload Details",
            "Recipient Profile",
            "Mark as Read Delete"
          ],
          [
            "NT-1263 ID: z1a2b3c4-5d...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "SUBSCRIPTION_REACTIVATED",
            "Your subscription to Premium Monthly has been successfully reactivated Your subscription to Premium Monthly has been successfully reactivated",
            "Unread",
            "May 20, 11:30 May 20, 2024 11:30:00",
            "Payload Details",
            "Recipient Profile",
            "Mark as Read Delete"
          ],
          [
            "NT-1264 ID: e4f5g6h7-8i...",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User Avatar]] Sarah Johnson",
            "PAYMENT_PLAN_CANCELED",
            "Your payment plan for The Complete UX Bootcamp has been canceled Your payment plan for The Complete UX Bootcamp has been canceled. You may lose access to this product.",
            "Unread",
            "Apr 15, 13:00 Apr 15, 2024 13:00:00",
            "Payload Details",
            "Recipient Profile",
            "Mark as Read Delete"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "checklist-instances": {
    "source": "html/system & operations/check list instance.html",
    "tables": [
      {
        "headers": [
          "Entity",
          "Type",
          "Entity Status",
          "Issues",
          "Last Checked",
          "VIEW",
          "LINKED TO",
          "Column 8"
        ],
        "rows": [
          [
            "[[img:https://i.ibb.co/XZwpwsqp/product1.webp|Thumb]] Advanced Python Masterclass PROD-9921 Internal: PROD-9921",
            "Course",
            "Draft",
            "3 Failed",
            "Oct 12, 10:30 AM",
            "Detailed Status",
            "Edit Entity Settings",
            "Force Re-check Notify Owner"
          ],
          [
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|Avatar]] Michael Chen USR-8821 Internal: USR-8821",
            "Profile",
            "Active",
            "1 Failed",
            "Oct 11, 4:15 PM",
            "Detailed Status",
            "Edit Profile Settings",
            "Force Re-check Notify Owner"
          ],
          [
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Thumb]] Weekly Q&A Session EVT-1044 Internal: EVT-1044",
            "Event",
            "Published",
            "0 Failed",
            "Oct 12, 11:00 AM",
            "Detailed Status",
            "Edit Entity Settings",
            "Force Re-check"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "search-management": {
    "source": "html/system & operations/search management.html",
    "tables": [
      {
        "headers": [
          "Time",
          "User / IP",
          "Search Term",
          "Hits",
          "Clicked",
          "Filters"
        ],
        "rows": [
          [
            "Mar 05, 10:30 AM Full Date: March 05, 2025 10:30:15 AM",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|User]] Sarah Johnson 192.168.1.42",
            "ux design course",
            "12",
            "Clicked: Complete UX Design Masterclass (ID: 8329)",
            "2 filters Price"
          ],
          [
            "Mar 05, 10:28 AM Full Date: March 05, 2025 10:28:45 AM",
            "Guest 85.124.33.98",
            "advanced react patterns",
            "0",
            "-",
            "-"
          ],
          [
            "Mar 05, 09:15 AM Full Date: March 05, 2025 09:15:22 AM",
            "[[img:https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png|User]] Michael Chen 45.89.127.55",
            "figma",
            "45",
            "Clicked: Figma for Beginners (ID: 9921)",
            "-"
          ]
        ]
      },
      {
        "headers": [
          "Collection",
          "Docs",
          "Last Sync",
          "Status",
          "Schema",
          "Column 6"
        ],
        "rows": [
          [
            "products",
            "1,432",
            "Mar 05, 10:00 AM",
            "Idle",
            "",
            "Force Re-sync View Sync Log"
          ],
          [
            "users",
            "8,432",
            "Mar 05, 09:45 AM",
            "Syncing",
            "",
            "Force Re-sync View Sync Log"
          ],
          [
            "communities",
            "124",
            "Mar 04, 11:30 PM",
            "Error",
            "",
            "Force Re-sync View Sync Log"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "marketing-emails": {
    "source": "html/system & operations/marketing emails.html",
    "tables": [
      {
        "headers": [
          "Campaign",
          "Instructor",
          "Target",
          "Subject",
          "Status",
          "Date",
          "Sent",
          "Open / Click",
          "Unsub",
          "VIEW",
          "LINKED",
          "Column 12"
        ],
        "rows": [
          [
            "🏷️ Black Friday Sale Internal Title CMP-8392 ID: CMP-8392",
            "[[img:https://i.ibb.co/XZwpwsqp/product1.webp|Avatar]] Sarah J.",
            "All Followers Target: All Followers (2,405 users)",
            "50% Off All My Courses This Week! 50% Off All My Courses This Week!",
            "Sent",
            "Mar 10, 2025",
            "2,405",
            "45% / 12%",
            "5",
            "View Email Delivery Logs",
            "Profile",
            "View in Resend"
          ],
          [
            "📣 New Course Launch CMP-8401",
            "[[img:https://i.ibb.co/SwpdsBdp/product2.webp|Avatar]] Michael C.",
            "Course: UX Basics Target: Students of 'UX Basics'",
            "Get Ready for Advanced UI!",
            "Scheduled",
            "Mar 15, 2025",
            "-",
            "-",
            "-",
            "View Email",
            "Product",
            "Cancel Schedule"
          ]
        ]
      }
    ],
    "datasets": {}
  },
  "system-health": {
    "source": "html/system & operations/system health & logs.html",
    "tables": [
      {
        "headers": [
          "Job Name",
          "Last Run Time",
          "Status",
          "Duration"
        ],
        "rows": [
          [
            "daily-progress-aggregation",
            "Oct 12, 00:15:00",
            "Success",
            "1240ms"
          ],
          [
            "monthly-payout-calculation",
            "Oct 01, 00:05:00",
            "Success",
            "4500ms"
          ],
          [
            "subscription-cancellation",
            "Oct 12, 14:00:00",
            "Success",
            "850ms"
          ]
        ]
      },
      {
        "headers": [
          "Timestamp",
          "Direction",
          "Service",
          "Endpoint / Event",
          "Status",
          "Code",
          "Time",
          "VIEW"
        ],
        "rows": [
          [
            "Oct 12, 14:30:05",
            "Outgoing",
            "LearnWorlds",
            "POST /v2/users",
            "Success",
            "201",
            "450ms",
            "View Details"
          ],
          [
            "Oct 12, 14:28:12",
            "Incoming",
            "PayPal",
            "payment.capture.completed",
            "Success",
            "200",
            "120ms",
            "View Details"
          ],
          [
            "Oct 12, 14:25:00",
            "Outgoing",
            "Certifier.io",
            "POST /credentials/issue",
            "Failed",
            "500",
            "2100ms",
            "View Details"
          ]
        ]
      },
      {
        "headers": [
          "Timestamp",
          "Severity",
          "Component",
          "Message",
          "User Context",
          "VIEW"
        ],
        "rows": [
          [
            "Oct 12, 14:10:00",
            "ERROR",
            "PayoutService",
            "Insufficient funds for payout run",
            "System",
            ""
          ],
          [
            "Oct 12, 13:45:22",
            "WARNING",
            "WebhookHandler",
            "Duplicate webhook received (idempotency check)",
            "-",
            ""
          ]
        ]
      },
      {
        "headers": [
          "Timestamp",
          "Admin User",
          "Action",
          "Target",
          "IP Address",
          "VIEW"
        ],
        "rows": [
          [
            "Oct 12, 12:30:00",
            "[[img:https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png|]] Sarah Johnson",
            "SUSPEND_USER",
            "User: John Doe (ID: 123)",
            "192.168.1.50",
            ""
          ]
        ]
      },
      {
        "headers": [
          "Timestamp",
          "Recipient",
          "Subject",
          "Type",
          "Status",
          "Resend ID",
          "VIEW"
        ],
        "rows": [
          [
            "Oct 12, 14:00:00",
            "student@example.com",
            "Welcome to the Course!",
            "Transactional",
            "Delivered",
            "re_12345",
            ""
          ]
        ]
      }
    ],
    "datasets": {}
  }
} as const;
