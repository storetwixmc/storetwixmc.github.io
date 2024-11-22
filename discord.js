
const onlineMemberCounter = document.getElementById('onlineMemberCounter');






function fetchServerData(inviteCode) {
    const apiUrl = `https://discord.gg/7JFEWaDc/${encodeURIComponent(inviteCode)}?with_counts=true`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.guild) {
                updateServerInfo(data);
                startUpdateInterval(inviteCode);
                startCountdownTimer();
            } else {
                showError('Invalid invite code');
            }
        })
        .catch(error => {
            showError('Error fetching server data');
            console.error('Error:', error);
        });
}

function updateServerInfo(serverData) {
  const serverIconUrl = `https://discord.gg/7JFEWaDc/${serverData.guild.id}/`;
  const serverIcon = document.getElementById('serverIcon');
  serverIcon.src = serverIconUrl;

  if (onlineMembers !== prevOnlineMembers) {
    onlineMemberCounter.classList.remove('animate__animated', 'animate__flipInY');
    void onlineMemberCounter.offsetWidth; // Trigger a reflow
    onlineMemberCounter.classList.add('animate__animated', 'animate__flipInY');
    onlineMemberCounter.textContent = `${onlineMembers}`;
  }

  serverInfo.classList.remove('hidden');
}

function startUpdateInterval(inviteCode) {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        fetchServerData(inviteCode);
    }, 30000); // Update every 30 seconds
}



