import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Box, List, ListItem,IconButton, ListItemText, Button, Alert, Avatar, CardHeader } from "@mui/material";
import DashboardAPI from "../api/admin";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";


const StatCard = ({ title, value }) => (
    <Card sx={{
        p: 2,
        textAlign: "center",
        boxShadow: 3,
        borderRadius: 2,
        transition: "0.3s",
        '&:hover': { boxShadow: 6 },
    }}>
        <CardContent>
            <Typography variant="h6" color="primary" fontWeight={600}>
                {title}
            </Typography>
            <Typography variant="h4" color="text.secondary" fontWeight={700}>
                {value}
            </Typography>
        </CardContent>
    </Card>
);

const RecentActivitiesCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activities, setActivities] = useState([]);
    const [slideDirection, setSlideDirection] = useState("next");


    useEffect(() => {
        async function fetchActivities() {
            try {
                const data = await DashboardAPI.getRecentActivities();
                setActivities(data);
            } catch (error) {
                console.error("Error fetching recent activities:", error);
            }
        }
        fetchActivities();
    }, []);

    useEffect(() => {
        if (activities.length > 1) {
            const interval = setInterval(() => {
                handleNext();
            }, 3000);

            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [activities]);


    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % activities.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? activities.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setSlideDirection("next");
        setCurrentIndex((prevIndex) => (prevIndex + 1) % activities.length);
    };

    const handlePrev = () => {
        setSlideDirection("prev");
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? activities.length - 1 : prevIndex - 1
        );
    };

    return (
        <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
            <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Recent Activities
                </Typography>

                {activities.length > 0 ? (
                    <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: "100px", overflow: "hidden"}}>
                        {/* Left Arrow */}
                        <IconButton onClick={handlePrev} sx={{ position: "absolute", left: 0 }}>
                            <ArrowBackIos />
                        </IconButton>

                        {/* Activity Slide */}
                        <Box>
                            <Typography variant="body1" fontWeight={500}>
                                {activities[currentIndex].description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {activities[currentIndex].timestamp}
                            </Typography>
                        </Box>

                       

                        {/* Right Arrow */}
                        <IconButton onClick={nextSlide} sx={{ position: "absolute", right: 0 }}>
                            <ArrowForwardIos />
                        </IconButton>
                    </Box>
                ) : (
                    <Typography color="text.secondary">No recent activities.</Typography>
                )}
            </CardContent>
        </Card>
    );
};


// Function to format timestamps as "X hours ago"
const timeAgo = (timestamp) => {
    const pastDate = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - pastDate) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

const MostActiveUser = () => {
    const [activeUser, setActiveUser] = useState(null);

    useEffect(() => {
        async function fetchActiveUser() {
            try {
                const data = await DashboardAPI.getMostActiveUser();
                setActiveUser(data);
            } catch (error) {
                console.error("Error fetching most active user:", error);
            }
        }
        fetchActiveUser();
    }, []);

    return (
        <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
            {activeUser ? (
                <CardHeader
                    avatar={<Avatar src={activeUser.avatar || "/default-avatar.jpg"} />}
                    title={activeUser.name}
                    subheader={`Most Active User (${activeUser.bookings} Bookings)`}
                />
            ) : (
                <Typography color="text.secondary" textAlign="center">No active user data available.</Typography>
            )}
        </Card>
    );
};

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalFlats: 0,
        totalUsers: 0,
        totalBookings: 0,
        activeBookings: 0,
        cancelledBookings: 0
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const data = await DashboardAPI.getStats();
                setStats(data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        }
        fetchStats();
    }, []);

    return (
        <DashboardLayout>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Admin Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Overview of key metrics and activities.
            </Typography>
            <Alert severity="warning" sx={{ mb: 3 }}>
                5 Flats are currently unavailable due to maintenance.
            </Alert>
            <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}><StatCard title="Total Flats" value={stats.totalFlats} /></Grid>
                    <Grid item xs={12} md={4}><StatCard title="Total Users" value={stats.totalUsers} /></Grid>
                    <Grid item xs={12} md={4}><StatCard title="Total Bookings" value={stats.totalBookings} /></Grid>
                    <Grid item xs={12} md={6}><StatCard title="Active Bookings" value={stats.activeBookings} /></Grid>
                    <Grid item xs={12} md={6}><StatCard title="Cancelled Bookings" value={stats.cancelledBookings} /></Grid>
                    <Grid item xs={12} md={6}><RecentActivitiesCarousel /></Grid>
                    <Grid item xs={12} md={6}><MostActiveUser /></Grid>
                </Grid>
            </Box>

        </DashboardLayout>
    );
};

export default AdminDashboard;
