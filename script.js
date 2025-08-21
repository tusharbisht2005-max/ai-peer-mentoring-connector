document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Database of Mentors ---
    // In a real application, this would come from a server.
    const mentors = [
        {
            name: "Priya Sharma",
            subjects: ["calculus", "physics"],
            strengths: ["exam-prep", "concept-understanding"],
            teachingStyle: "visual",
        },
        {
            name: "Rohan Gupta",
            subjects: ["programming"],
            strengths: ["homework-help", "practical-projects"],
            teachingStyle: "practical",
        },
        {
            name: "Aisha Khan",
            subjects: ["chemistry", "physics"],
            strengths: ["concept-understanding", "homework-help"],
            teachingStyle: "discussion",
        },
        {
            name: "Vikram Singh",
            subjects: ["writing", "history"],
            strengths: ["exam-prep"],
            teachingStyle: "discussion",
        },
        {
            name: "Sneha Reddy",
            subjects: ["calculus", "programming"],
            strengths: ["exam-prep", "homework-help"],
            teachingStyle: "practical",
        }
    ];

    const form = document.getElementById('find-mentor-form');
    const resultsContainer = document.getElementById('results-container');
    const mentorList = document.getElementById('mentor-list');
    const loader = document.getElementById('loader');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload

        // Show loader and results container
        resultsContainer.classList.remove('hidden');
        loader.classList.remove('hidden');
        mentorList.innerHTML = ''; // Clear previous results

        // Get mentee's preferences
        const menteeSubject = document.getElementById('subject').value;
        const menteeGoal = document.getElementById('goal').value;
        const menteeStyle = document.getElementById('style').value;

        // --- SIMULATED AI MATCHING LOGIC ---
        setTimeout(() => { // Simulate network delay
            const matchedMentors = mentors.map(mentor => {
                let score = 0;
                // Award points based on matches
                if (mentor.subjects.includes(menteeSubject)) {
                    score += 5; // Strong weight for subject
                }
                if (mentor.strengths.includes(menteeGoal)) {
                    score += 3; // Medium weight for goal
                }
                if (mentor.teachingStyle === menteeStyle) {
                    score += 2; // Lower weight for style
                }
                return { ...mentor, score };
            })
            .filter(mentor => mentor.score > 0) // Filter out mentors with no match
            .sort((a, b) => b.score - a.score); // Sort by highest score first

            loader.classList.add('hidden');
            displayMentors(matchedMentors.slice(0, 3)); // Display top 3 matches
        }, 1500); // 1.5 second delay
    });

    function displayMentors(matches) {
        if (matches.length === 0) {
            mentorList.innerHTML = '<p>Sorry, no perfect matches found. Try different criteria!</p>';
            return;
        }

        matches.forEach(mentor => {
            const card = document.createElement('div');
            card.className = 'mentor-card';
            card.innerHTML = `
                <div class="match-score">Match Score: ${mentor.score}</div>
                <h3>${mentor.name}</h3>
                <div>
                    <strong>Subjects:</strong> 
                    ${mentor.subjects.map(s => `<span class="tag">${s}</span>`).join('')}
                </div>
                <div>
                    <strong>Good for:</strong> 
                    ${mentor.strengths.map(s => `<span class="tag">${s}</span>`).join('')}
                </div>
                <div>
                    <strong>Teaching Style:</strong> 
                    <span class="tag">${mentor.teachingStyle}</span>
                </div>
            `;
            mentorList.appendChild(card);
        });
    }
});
