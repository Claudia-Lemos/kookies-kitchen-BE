// Change Password Route
router.put('/change-password', authMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
  
   
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ message: 'User not found' });
  
    
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Incorrect old password' });
  
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
  
    user.password = hashedPassword;
    await user.save();
  
    res.json({ message: 'Password changed successfully' });
  });
  