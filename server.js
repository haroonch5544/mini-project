/**
 * SkillPath AI - Backend Server
 * Express API for user authentication and roadmap management
 */

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'skillpath_secret_key_2025';

// Middleware
app.use(cors());
app.use(express.json());

// Data file paths
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const ROADMAPS_FILE = path.join(__dirname, 'data', 'roadmaps.json');

// Helper functions to read/write JSON files
function readJSON(file) {
    try {
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

function writeJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Auth middleware
function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// ==========================================
// AUTH ROUTES
// ==========================================

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const users = readJSON(USERS_FILE);

        // Check if user exists
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = {
            id: uuidv4(),
            email,
            name,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        writeJSON(USERS_FILE, users);

        // Generate token
        const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'Account created successfully',
            token,
            user: { id: newUser.id, email: newUser.email, name: newUser.name }
        });
    } catch (e) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const users = readJSON(USERS_FILE);
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email, name: user.name }
        });
    } catch (e) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get current user
app.get('/api/auth/me', authMiddleware, (req, res) => {
    const users = readJSON(USERS_FILE);
    const user = users.find(u => u.id === req.userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({ id: user.id, email: user.email, name: user.name });
});

// ==========================================
// ROADMAP ROUTES
// ==========================================

// Get all user's roadmaps
app.get('/api/roadmaps', authMiddleware, (req, res) => {
    const roadmaps = readJSON(ROADMAPS_FILE);
    const userRoadmaps = roadmaps.filter(r => r.userId === req.userId);
    res.json(userRoadmaps);
});

// Get single roadmap
app.get('/api/roadmaps/:id', authMiddleware, (req, res) => {
    const roadmaps = readJSON(ROADMAPS_FILE);
    const roadmap = roadmaps.find(r => r.id === req.params.id && r.userId === req.userId);

    if (!roadmap) {
        return res.status(404).json({ error: 'Roadmap not found' });
    }

    res.json(roadmap);
});

// Save new roadmap
app.post('/api/roadmaps', authMiddleware, (req, res) => {
    const { jobTitle, jobType, experienceLevel, skills, roadmap, progress } = req.body;

    if (!jobTitle || !roadmap) {
        return res.status(400).json({ error: 'Job title and roadmap are required' });
    }

    const roadmaps = readJSON(ROADMAPS_FILE);

    const newRoadmap = {
        id: uuidv4(),
        userId: req.userId,
        jobTitle,
        jobType: jobType || 'Unknown',
        experienceLevel: experienceLevel || 'Not specified',
        skills: skills || [],
        roadmap,
        progress: progress || {},
        totalSkills: roadmap.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    roadmaps.push(newRoadmap);
    writeJSON(ROADMAPS_FILE, roadmaps);

    res.status(201).json({ message: 'Roadmap saved', roadmap: newRoadmap });
});

// Update roadmap progress
app.put('/api/roadmaps/:id', authMiddleware, (req, res) => {
    const { progress } = req.body;
    const roadmaps = readJSON(ROADMAPS_FILE);
    const index = roadmaps.findIndex(r => r.id === req.params.id && r.userId === req.userId);

    if (index === -1) {
        return res.status(404).json({ error: 'Roadmap not found' });
    }

    roadmaps[index].progress = progress;
    roadmaps[index].updatedAt = new Date().toISOString();
    writeJSON(ROADMAPS_FILE, roadmaps);

    res.json({ message: 'Progress updated', roadmap: roadmaps[index] });
});

// Delete roadmap
app.delete('/api/roadmaps/:id', authMiddleware, (req, res) => {
    const roadmaps = readJSON(ROADMAPS_FILE);
    const index = roadmaps.findIndex(r => r.id === req.params.id && r.userId === req.userId);

    if (index === -1) {
        return res.status(404).json({ error: 'Roadmap not found' });
    }

    roadmaps.splice(index, 1);
    writeJSON(ROADMAPS_FILE, roadmaps);

    res.json({ message: 'Roadmap deleted' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 SkillPath API running on http://localhost:${PORT}`);
});
