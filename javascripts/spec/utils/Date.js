spec(artjs.Date, function() {
  describe('#getTime', function() {
    it('should return getTime() of Date instance', function() {
      var result = subject().getTime();
      
      expect(result).to(beA('number'));
    });
  });

  describe('#monthDaysNum', function() {
    it('should return number of days in given month', function() {
      var result = subject().monthDaysNum('2014-02-23');
      
      expect(result).to(eq(28));
    });
  });

  describe('#firstDate', function() {
    it('should return first day of the month', function() {
      var result = subject().firstDate('2014-02-23');
      
      expect(result.getDate()).to(eq(1));
      expect(result.getMonth()).to(eq(1));
      expect(result.getFullYear()).to(eq(2014));
    });
  });

  describe('#firstDay', function() {
    it('should return week day of first day of the month', function() {
      var date = '2014-02-23';
      var firstDate = mock();
      var result = mock();
      
      expect(subject()).to(receive('firstDate')).withArgs(date).andReturn(firstDate);
      expect(firstDate).to(receive('getDay')).andReturn(result);
      
      expect(subject().firstDay(date)).to(eq(result));
    });
  });

  describe('#toHMS', function() {
    it('should return hours, minutes, seconds format of date', function() {
      var date = new Date('Mon, 25 Dec 1995 13:30:00');
      
      expect(subject().toHMS(date)).to(eq('13:30:00'));
    });
  });

  describe('#toYMD', function() {
    it('should return year, month, date format of date', function() {
      var date = new Date('Mon, 25 Dec 1995 13:30:00');

      expect(subject().toYMD(date, '/')).to(eq('1995/12/25'));
    });
  });

  describe('#toDMY', function() {
    it('should return date, month, year format of date', function() {
      var date = new Date('Mon, 25 Dec 1995 13:30:00');

      expect(subject().toDMY(date, '/')).to(eq('25/12/1995'));
    });
  });

  describe('#fromDMY', function() {
    it('should create date based on date, month, year format', function() {
      var result = subject().fromDMY('23/02/2014', '/');

      expect(result.getFullYear()).to(eq(2014));
      expect(result.getMonth()).to(eq(1));
      expect(result.getDate()).to(eq(23));
    });
  });

  describe('#fromYMD', function() {
    it('should create date based on year, month, date format', function() {
      var result = subject().fromYMD('2014/02/23', '/');

      expect(result.getFullYear()).to(eq(2014));
      expect(result.getMonth()).to(eq(1));
      expect(result.getDate()).to(eq(23));
    });
  });

  describe('#minutesToHM', function() {
    it('should convert minutes to hours, minutes format', function() {
      var result = subject().minutesToHM(68);

      expect(result).to(eq('1:08'));
    });
  });

  describe('#hmToMinutes', function() {
    it('should return number of minutes based on hours, minutes format', function() {
      var result = subject().hmToMinutes('1:08');

      expect(result).to(eq(68));
    });
  });

  describe('#secondsToMS', function() {
    it('should convert seconds to minutes, seconds format', function() {
      var result = subject().secondsToMS(68);

      expect(result).to(eq('01:08'));
    });
  });

  describe('#msToSeconds', function() {
    it('should return number of seconds based on minutes, seconds format', function() {
      var result = subject().msToSeconds('1:08');

      expect(result).to(eq(68));
    });
  });

  describe('#secondsToHMS', function() {
    it('should convert seconds to hours, minutes, seconds format', function() {
      var result = subject().secondsToHMS(3982);

      expect(result).to(eq('1:06:22'));
    });
  });

  describe('#copy', function() {
    it('should return copy of date', function() {
      var date = new Date('Mon, 25 Dec 1995 13:30:00');
      var result = subject().copy(date);

      expect(result.getFullYear()).to(eq(1995));
      expect(result.getMonth()).to(eq(11));
      expect(result.getDate()).to(eq(25));
      expect(result.getHours()).to(eq(13));
      expect(result.getMinutes()).to(eq(30));
      expect(result.getSeconds()).to(eq(0));
    });
  });

  describe('#getDateShifted', function() {
    it('should return date with days offset', function() {
      var date = new Date('Mon, 25 Dec 1995 13:30:00');
      var result = subject().getDateShifted(date, -3);

      expect(result.getFullYear()).to(eq(1995));
      expect(result.getMonth()).to(eq(11));
      expect(result.getDate()).to(eq(22));
      expect(result.getHours()).to(eq(13));
      expect(result.getMinutes()).to(eq(30));
      expect(result.getSeconds()).to(eq(0));
    });
  });

  describe('#stripDayTime', function() {
    it('should return date with time set to 0', function() {
      var date = new Date('Mon, 25 Dec 1995 13:30:00');
      var result = subject().stripDayTime(date);

      expect(result.getFullYear()).to(eq(1995));
      expect(result.getMonth()).to(eq(11));
      expect(result.getDate()).to(eq(25));
      expect(result.getHours()).to(eq(0));
      expect(result.getMinutes()).to(eq(0));
      expect(result.getSeconds()).to(eq(0));
    });
  });

  describe('#msToHMSM', function() {
    it('should convert miliseconds to hours, minutes, seconds, miliseconds format', function() {
      var result = subject().msToHMSM(3982123);

      expect(result).to(eq('1:06:22.123'));
    });
  });

  describe('#msToMSM', function() {
    it('should convert miliseconds to minutes, seconds, miliseconds format', function() {
      var result = subject().msToMSM(3982123);

      expect(result).to(eq('66:22.123'));
    });
  });
});
